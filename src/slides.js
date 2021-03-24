import Reveal from 'reveal.js';

import './style/index.scss';

import Highlight from 'reveal.js/plugin/highlight/highlight.esm'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm';
import Notes from 'reveal.js/plugin/notes/notes.esm';
import { CustomHtmlElement } from './components/custom-html-element';
import { PreviewWindowElement } from './components/preview-window/preview-window';
import { TicTacToeGameElement } from './components/tic-tac-toe-game/tic-tac-toe-game';

let deck = new Reveal({
  plugins: [Highlight, Markdown, Notes]
});
deck.initialize({
  hash: true,
  navigationMode: 'linear',
  preloadIframes: true,
  width: 1280,
  height: 720,
  totalTime: 9000 // 2.5 hours
});

CustomHtmlElement.register(PreviewWindowElement);
CustomHtmlElement.register(TicTacToeGameElement);
