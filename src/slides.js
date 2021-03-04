import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/night.css';
import 'reveal.js/plugin/highlight/monokai.css';

import './style/index.scss'

import Highlight from 'reveal.js/plugin/highlight/highlight.esm'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm';
import Notes from 'reveal.js/plugin/notes/notes.esm';
import { CustomHtmlElement } from './components/custom-html-element';
import { PreviewWindowElement } from './components/preview-window/preview-window';

let deck = new Reveal({
  plugins: [Highlight, Markdown, Notes]
});
deck.initialize({
  hash: true,
  navigationMode: 'linear',
  preloadIframes: true,
  width: 1280,
  height: 720
});

CustomHtmlElement.register(PreviewWindowElement);