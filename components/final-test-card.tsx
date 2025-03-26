"use client"

import type { FC } from "react"
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md"
import { toast } from "react-hot-toast"
import { DeleteOutlineOutlined } from "@mui/icons-material"
import { Edit, Trash, TrashIcon } from "lucide-react"
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit } from "react-icons/fi"

interface IDuration {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface IFinalTestCardProps {
  id: string
  name: string
  description: string
  duration: IDuration
  withSections: boolean
  createdAt: string
  questionsCount?: number
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const formatDuration = (duration: IDuration) => {
  const parts = []
  if (duration.days > 0) parts.push(`${duration.days}d`)
  if (duration.hours > 0) parts.push(`${duration.hours}h`)
  if (duration.minutes > 0) parts.push(`${duration.minutes}m`)
  if (duration.seconds > 0) parts.push(`${duration.seconds}s`)
  return parts.join(" ") || "No time limit"
}

const FinalTestCard: FC<IFinalTestCardProps> = ({
  id,
  name,
  description,
  duration,
  withSections,
  createdAt,
  questionsCount = 0,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-[#F5F5F5] dark:bg-slate-800 rounded-sm border border-b dark:border-gray-500 shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-2xl truncate mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-shrink-0">{description}</p>

        <div className="space-y-2 mb-4 flex-shrink-0">
          <div className="flex items-start text-sm">
            <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Duration:</span>
            <span className="font-medium ml-auto truncate">{formatDuration(duration)}</span>
          </div>

          <div className="flex items-start text-sm">
            <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Created:</span>
            <span className="font-medium ml-auto truncate">{new Date(createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-start text-sm">
            <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Questions:</span>
            <span className="font-medium ml-auto truncate">{questionsCount}</span>
          </div>

          <div className="flex items-start text-sm">
            <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Sections:</span>
            <span className="font-medium ml-auto truncate">{withSections ? "Yes" : "No"}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t dark:border-gray-700 mt-auto flex-shrink-0">
          <button
            className="flex items-center text-[#475569] dark:text-[#3E4399] hover:underline"
            onClick={() => {
              toast("Preview quiz to be implemented")
            }}
          >
            <MdVisibility className="h-4 w-5 mr-1" />
            <span className="truncate font-semibold text-sm">Preview</span>
          </button>

          <div className="flex gap-2 flex-shrink-0">
            <button className="dark:text-[#3E4399] text-slate-700 hover:scale-110 transition-transform duration-200"
              onClick={() => onEdit(id)} title="Edit Quiz">
              <FiEdit size={17} />
            </button>

            <button className="text-red-600 hover:scale-110 transition-transform duration-200"
              onClick={() => onDelete(id)} title="Delete Quiz">
              <Trash size={19} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FinalTestCard

