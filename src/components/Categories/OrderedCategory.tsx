'use client'

import { revalidate, updateCategoryOrder } from '@/app/(frontend)/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Category } from '@/payload-types'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, RotateCcw, Save } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

interface SortableCategoryItemProps {
  category: Category
  index: number
}

function SortableCategoryItem({ category, index }: SortableCategoryItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '12px',
    cursor: 'move',
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
  }

  return (
    <Card ref={setNodeRef} style={style}>
      <CardContent style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Move drag handle outside of nested divs for better drag detection */}
            <div
              {...attributes}
              {...listeners}
              style={{
                cursor: 'grab',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: '#f7fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                minHeight: '32px',
              }}
            >
              <GripVertical style={{ width: '20px', height: '20px', color: '#a0aec0' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div>
                <h3 style={{ fontWeight: '600', color: '#fff' }}>{category.title}</h3>
                <p style={{ fontSize: '12px', color: '#718096' }}>Order: {category.order || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface OrderedCategoryProps {
  path: string
  value?: any
  onChange?: (value: any) => void
}

export default function OrderedCategory({ path, value, onChange }: OrderedCategoryProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [originalCategories, setOriginalCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/categories?limit=100&sort=order')
      if (response.ok) {
        const data = await response.json()
        const sortedCategories = data.docs.sort(
          (a: Category, b: Category) => (a.order || 0) - (b.order || 0),
        )
        setCategories(sortedCategories)
        setOriginalCategories(sortedCategories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    // Improved change detection - compare arrays by order values
    const hasOrderChanged =
      categories.length > 0 &&
      originalCategories.length > 0 &&
      categories.some((cat, index) => {
        const originalCat = originalCategories.find((orig) => orig.id === cat.id)
        return originalCat && cat.order !== originalCat.order
      })
    setHasChanges(hasOrderChanged)
  }, [categories, originalCategories])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        const newItems = arrayMove(items, oldIndex, newIndex)

        return newItems.map((item, index) => ({
          ...item,
          order: index + 1,
        }))
      })
    }
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!hasChanges) return

    setIsSaving(true)
    setSaveStatus('saving')
    try {
      await updateCategoryOrder(
        categories.map((category) => ({
          id: category.id,
          order: category.order || 0,
        })),
      )
      await revalidate('categories')
      await fetchCategories()
      setSaveStatus('success')

      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      console.error('Error saving category order:', error)
      setSaveStatus('error')

      // Reset error status after 5 seconds
      setTimeout(() => setSaveStatus('idle'), 5000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setCategories([...originalCategories])
    setSaveStatus('idle')
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                borderRadius: '50%',
                height: '32px',
                width: '32px',
                border: '4px solid #2d3748',
                borderTop: '4px solid transparent',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
            <span style={{ marginLeft: '12px', color: '#4a5568' }}>Loading categories...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>Category Order Management</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasChanges || isSaving}
              onClick={handleReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                padding: '6px 12px',
              }}
            >
              <RotateCcw style={{ width: '16px', height: '16px' }} />
              Reset
            </Button>
            <Button
              onClick={(e) => handleSave(e)}
              disabled={!hasChanges || isSaving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                padding: '6px 12px',
                backgroundColor:
                  saveStatus === 'success'
                    ? '#10b981'
                    : saveStatus === 'error'
                      ? '#ef4444'
                      : undefined,
                color: saveStatus !== 'idle' ? 'white' : undefined,
              }}
            >
              <Save style={{ width: '16px', height: '16px' }} />
              {isSaving
                ? 'Saving...'
                : saveStatus === 'success'
                  ? 'Saved!'
                  : saveStatus === 'error'
                    ? 'Error!'
                    : 'Save Order'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Save status indicator */}
        {saveStatus === 'saving' && (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                borderRadius: '50%',
                height: '16px',
                width: '16px',
                border: '2px solid #f59e0b',
                borderTop: '2px solid transparent',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
            <span style={{ color: '#92400e', fontSize: '14px' }}>Saving category order...</span>
          </div>
        )}

        {saveStatus === 'success' && (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#d1fae5',
              border: '1px solid #10b981',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: '#065f46', fontSize: '14px' }}>
              ✅ Category order saved successfully!
            </span>
          </div>
        )}

        {saveStatus === 'error' && (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#fee2e2',
              border: '1px solid #ef4444',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: '#991b1b', fontSize: '14px' }}>
              ❌ Error saving category order. Please try again.
            </span>
          </div>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={categories.map((cat) => cat.id)}
            strategy={verticalListSortingStrategy}
          >
            <div style={{ marginTop: '8px' }}>
              {categories.map((category, index) => (
                <SortableCategoryItem key={category.id} category={category} index={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {categories.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#4a5568' }}>
            No categories found. Please create some categories first.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
