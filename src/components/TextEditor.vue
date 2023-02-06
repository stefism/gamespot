<template>
  <div class="awesome_editor">
    <div v-if="editor" class="btn_container">
      <span
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Bold
      </span>
      <span
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        Italic
      </span>
      <span
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </span>
      <span
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </span>
      <span
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet list
      </span>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default {
  props: ["content"],
  components: { EditorContent },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      content: "",
      extensions: [StarterKit],
      onUpdate: () => {
        this.$emit("update", this.editor.getHTML());
      },
    });

    if (this.content) {
      this.editor.commands.setContent(this.content);
      this.$emit("update", this.editor.getHTML());
    }
  },
};
</script>

<style></style>
