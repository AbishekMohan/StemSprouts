"use client"

import type { ReactNode } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  Undo,
  Redo,
} from "lucide-react"
import { POST_CONTENT_CLASSES } from "@/lib/post-content-classes"

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void
  active?: boolean
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`p-2 rounded-md border-2 ${
        active
          ? "bg-[#22C55E] border-black dark:border-white text-black"
          : "border-transparent text-black dark:text-white hover:border-black dark:hover:border-white"
      }`}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  function setLink() {
    const previousUrl = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("URL", previousUrl ?? "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-2 border-b-0 border-black dark:border-white rounded-t-lg px-2 py-1.5 bg-gray-50 dark:bg-neutral-900">
      <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-4 h-4" />
      </ToolbarButton>
      <div className="w-px h-5 bg-gray-300 dark:bg-neutral-700 mx-1" />
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="w-4 h-4" />
      </ToolbarButton>
      <div className="w-px h-5 bg-gray-300 dark:bg-neutral-700 mx-1" />
      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon className="w-4 h-4" />
      </ToolbarButton>
      <div className="w-px h-5 bg-gray-300 dark:bg-neutral-700 mx-1" />
      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="w-4 h-4" />
      </ToolbarButton>
    </div>
  )
}

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: `min-h-[16rem] px-3 py-2 focus:outline-none text-black dark:text-white leading-relaxed ${POST_CONTENT_CLASSES}`,
      },
    },
  })

  if (!editor) return null

  return (
    <div>
      <Toolbar editor={editor} />
      <div className="border-2 border-black dark:border-white rounded-b-lg bg-white dark:bg-black text-black dark:text-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
