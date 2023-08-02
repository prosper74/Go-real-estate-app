import { $getRoot } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import ToolbarPlugin from "./plugins/toolbarPlugin";
import BaseTheme from "./themes";
import ActionsPlugin from "./plugins/actionsPlugin";
import CodeHighlightPlugin from "./plugins/codeHighlightPlugin";

function Placeholder() {
  return (
    <div className="editor-placeholder">
      Write a brief description about your property...
    </div>
  );
}

const editorConfig = {
  theme: BaseTheme,
  onError(error: any) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const onChange = (editorState: any) => {
  editorState.read(() => {
    const root = $getRoot();

    const markdownString = $convertToMarkdownString(TRANSFORMERS);

    console.log("Root: ", root);
    console.log("String: ", markdownString);
  });
};

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <CodeHighlightPlugin />
        </div>
        <ActionsPlugin />
      </div>
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
