import jquery from 'jquery';
window.jquery = window.$ = $;
import { fullpage } from './jquery.fullPage.js';
import './jquery.fullPage.css';
import Highway from '@dogstudio/highway';
import Fade from './transition';

$("#wrapper").fullpage({
 	anchors:['ex1', 'ex2', 'ex3', 'ex4']
 })

const H = new Highway.Core({
	transitions: {
		default: Fade
	}
});

console.log("Hello world")