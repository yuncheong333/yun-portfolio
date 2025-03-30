import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import type { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
import translations from 'ckeditor5/translations/ko.js';
import {

    ClassicEditor,
    AutoImage,
    Autosave,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    Essentials,
    Heading,
    ImageBlock,
    ImageCaption,
    ImageEditing,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    ImageUtils,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Markdown,
    MediaEmbed,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TodoList,
    Underline
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import '../styles/PostEditor.css';


// 라이센스 키
const LICENSE_KEY =
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDQ1MDIzOTksImp0aSI6IjEzNGFmZWY2LWE4OTYtNGUzOC1hNzIxLWNkMGYxYjk1NWFkZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjA2OTliMTVhIn0.94gBs1bOH3vwmN4y1rh-hIroWILsKW4WskzH0LloleY2v8XhCBMWeqEiw2XHMuy4aP_f3hpds_E_sE34pDB59A';

export default function PostEditor() {

    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig: EditorConfig = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'link',
                    'insertImage',
                    'mediaEmbed',
                    'insertTable',
                    'blockQuote',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'todoList',
                    'outdent',
                    'indent'
                ],
                shouldNotGroupWhenFull: false as boolean
            },
            plugins: [

                AutoImage,
                Autosave,
                Base64UploadAdapter,
                BlockQuote,
                Bold,
                Essentials,
                Heading,
                ImageBlock,
                ImageCaption,
                ImageEditing,
                ImageInline,
                ImageInsert,
                ImageInsertViaUrl,
                ImageResize,
                ImageStyle,
                ImageTextAlternative,
                ImageToolbar,
                ImageUpload,
                ImageUtils,
                Indent,
                IndentBlock,
                Italic,
                Link,
                LinkImage,
                List,
                ListProperties,
                Markdown,
                MediaEmbed,
                Paragraph,
                PasteFromMarkdownExperimental,
                PasteFromOffice,
                Table,
                TableCaption,
                TableCellProperties,
                TableColumnResize,
                TableProperties,
                TableToolbar,
                TodoList,
                Underline
            ],
            heading: {
                options: [
                    {
                        model: 'paragraph',
                        title: 'Paragraph',
                        class: 'ck-heading_paragraph'
                    },
                    {
                        model: 'heading1',
                        view: 'h1',
                        title: 'Heading 1',
                        class: 'ck-heading_heading1'
                    },
                    {
                        model: 'heading2',
                        view: 'h2',
                        title: 'Heading 2',
                        class: 'ck-heading_heading2'
                    },
                    {
                        model: 'heading3',
                        view: 'h3',
                        title: 'Heading 3',
                        class: 'ck-heading_heading3'
                    },
                    {
                        model: 'heading4',
                        view: 'h4',
                        title: 'Heading 4',
                        class: 'ck-heading_heading4'
                    },
                    {
                        model: 'heading5',
                        view: 'h5',
                        title: 'Heading 5',
                        class: 'ck-heading_heading5'
                    },
                    {
                        model: 'heading6',
                        view: 'h6',
                        title: 'Heading 6',
                        class: 'ck-heading_heading6'
                    }
                ]
            },
            image: {
                toolbar: [
                    'toggleImageCaption',
                    'imageTextAlternative',
                    '|',
                    'imageStyle:inline',
                    'imageStyle:wrapText',
                    'imageStyle:breakText',
                    '|',
                    'resizeImage'
                ]
            },
            initialData:
                '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>',
            language: {
                ui: 'ko',
                translations: { ko: translations.ko }
            },


            licenseKey: LICENSE_KEY,
            link: {
                addTargetToExternalLinks: true as boolean,
                defaultProtocol: 'https://',
                decorators: {
                    toggleDownloadable: {
                        mode: 'manual' as const,
                        label: 'Downloadable',
                        attributes: {
                            download: 'file'
                        }
                    }
                }
            },
            list: {
                properties: {
                    styles: true as boolean,
                    startIndex: true as boolean,
                    reversed: true as boolean
                }
            },
            placeholder: 'Type or paste your content here!',
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                    'tableProperties',
                    'tableCellProperties'
                ]
            },
            translations: [translations],

        };
    }, [isLayoutReady]);

    return (
        <div className="post-editor-container">
            <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                <div className="editor-container__editor">
                    <div ref={editorRef}>
                        {isLayoutReady && (
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfig}
                                onReady={(editor) => {
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, data });
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}