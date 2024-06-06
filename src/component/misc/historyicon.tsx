import React, { useState, useEffect } from "react";

function HistoryIconv2({ category }: any) {
	function getIcon(category: any) {
		switch (category) {
			case "send": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#c7d5d3" width="30"><path d="M 64 6 C 48.5 6 33.9 12 23 23 C 11.7 34.3 6 49.1 6 64 C 6 78.9 11.7 93.7 23 105 C 34 116 48.5 122 64 122 C 79.5 122 94.1 116 105 105 C 127.6 82.4 127.6 45.6 105 23 C 94.1 12 79.5 6 64 6 z M 64 12 C 77.9 12 90.900781 17.399219 100.80078 27.199219 C 110.90078 37.399219 116 50.7 116 64 C 116 77.3 110.90078 90.600781 100.80078 100.80078 C 90.900781 110.60078 77.9 116 64 116 C 50.1 116 37.099219 110.60078 27.199219 100.80078 C 6.9992187 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.099219 17.399219 50.1 12 64 12 z M 63.962891 41 C 63.200391 41 62.450391 41.300391 61.900391 41.900391 L 46.900391 56.900391 C 46.300391 57.500391 46 58.2 46 59 C 46 59.8 46.300391 60.499609 46.900391 61.099609 C 48.100391 62.299609 49.999609 62.299609 51.099609 61.099609 L 61 51.199219 L 61 82 C 61 83.7 62.3 85 64 85 C 65.7 85 67 83.7 67 82 L 67 51.199219 L 76.900391 61.099609 C 78.100391 62.299609 79.999609 62.299609 81.099609 61.099609 C 82.299609 59.899609 82.299609 58.000391 81.099609 56.900391 L 66.099609 41.900391 C 65.499609 41.300391 64.725391 41 63.962891 41 z" fill="#c7d5d3"/></svg>`;
			}
			case "deposit": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#c7d5d3" width="30"><path d="M 64 6 C 48.5 6 33.9 12 23 23 C 11.7 34.3 6 49.1 6 64 C 6 78.9 11.7 93.7 23 105 C 34 116 48.5 122 64 122 C 79.5 122 94.1 116 105 105 C 127.6 82.4 127.6 45.6 105 23 C 94.1 12 79.5 6 64 6 z M 64 12 C 77.9 12 90.900781 17.399219 100.80078 27.199219 C 110.90078 37.399219 116 50.7 116 64 C 116 77.3 110.90078 90.600781 100.80078 100.80078 C 90.900781 110.60078 77.9 116 64 116 C 50.1 116 37.099219 110.60078 27.199219 100.80078 C 6.9992187 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.099219 17.399219 50.1 12 64 12 z M 63.962891 41 C 63.200391 41 62.450391 41.300391 61.900391 41.900391 L 46.900391 56.900391 C 46.300391 57.500391 46 58.2 46 59 C 46 59.8 46.300391 60.499609 46.900391 61.099609 C 48.100391 62.299609 49.999609 62.299609 51.099609 61.099609 L 61 51.199219 L 61 82 C 61 83.7 62.3 85 64 85 C 65.7 85 67 83.7 67 82 L 67 51.199219 L 76.900391 61.099609 C 78.100391 62.299609 79.999609 62.299609 81.099609 61.099609 C 82.299609 59.899609 82.299609 58.000391 81.099609 56.900391 L 66.099609 41.900391 C 65.499609 41.300391 64.725391 41 63.962891 41 z" fill="#c7d5d3"/></svg>`;
			}
			case "receive": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#17bc76" width="30"><path d="M 64 6 C 48.5 6 33.9 12 23 23 C 11.7 34.3 6 49.1 6 64 C 6 78.9 11.7 93.7 23 105 C 34 116 48.5 122 64 122 C 79.5 122 94.1 116 105 105 C 127.6 82.4 127.6 45.6 105 23 C 94.1 12 79.5 6 64 6 z M 64 12 C 77.9 12 90.900781 17.399219 100.80078 27.199219 C 110.90078 37.399219 116 50.7 116 64 C 116 77.3 110.90078 90.600781 100.80078 100.80078 C 90.900781 110.60078 77.9 116 64 116 C 50.1 116 37.099219 110.60078 27.199219 100.80078 C 6.9992187 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.099219 17.399219 50.1 12 64 12 z M 64 43 C 62.3 43 61 44.3 61 46 L 61 76.800781 L 51.099609 66.900391 C 49.899609 65.700391 48.000391 65.700391 46.900391 66.900391 C 46.300391 67.500391 46 68.2 46 69 C 46 69.8 46.300391 70.499609 46.900391 71.099609 L 61.900391 86.099609 C 63.100391 87.299609 64.999609 87.299609 66.099609 86.099609 L 81.099609 71.099609 C 82.299609 69.899609 82.299609 68.000391 81.099609 66.900391 C 79.899609 65.700391 78.100391 65.700391 76.900391 66.900391 L 67 76.800781 L 67 46 C 67 44.3 65.7 43 64 43 z" fill="#17bc76"/></svg>`;
			}
			case "withdraw": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#17bc76" width="30"><path d="M 64 6 C 48.5 6 33.9 12 23 23 C 11.7 34.3 6 49.1 6 64 C 6 78.9 11.7 93.7 23 105 C 34 116 48.5 122 64 122 C 79.5 122 94.1 116 105 105 C 127.6 82.4 127.6 45.6 105 23 C 94.1 12 79.5 6 64 6 z M 64 12 C 77.9 12 90.900781 17.399219 100.80078 27.199219 C 110.90078 37.399219 116 50.7 116 64 C 116 77.3 110.90078 90.600781 100.80078 100.80078 C 90.900781 110.60078 77.9 116 64 116 C 50.1 116 37.099219 110.60078 27.199219 100.80078 C 6.9992187 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.099219 17.399219 50.1 12 64 12 z M 64 43 C 62.3 43 61 44.3 61 46 L 61 76.800781 L 51.099609 66.900391 C 49.899609 65.700391 48.000391 65.700391 46.900391 66.900391 C 46.300391 67.500391 46 68.2 46 69 C 46 69.8 46.300391 70.499609 46.900391 71.099609 L 61.900391 86.099609 C 63.100391 87.299609 64.999609 87.299609 66.099609 86.099609 L 81.099609 71.099609 C 82.299609 69.899609 82.299609 68.000391 81.099609 66.900391 C 79.899609 65.700391 78.100391 65.700391 76.900391 66.900391 L 67 76.800781 L 67 46 C 67 44.3 65.7 43 64 43 z" fill="#17bc76"/></svg>`;
			}
			case "airdrop": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#edf2f4" width="30"><path d="M 25 2 C 24.859375 2 24.726563 2.011719 24.59375 2.03125 C 15.402344 2.25 8 9.761719 8 19 C 8 24.894531 11.476563 29.164063 14.78125 32.46875 C 16.433594 34.121094 18.058594 35.566406 19.21875 36.84375 C 20.378906 38.121094 21 39.183594 21 40 C 21 40.550781 21.449219 41 22 41 L 23.625 41 C 23.867188 41.097656 24.132813 41.097656 24.375 41 L 25.625 41 C 25.875 41.105469 26.15625 41.105469 26.40625 41 L 28 41 C 28.550781 41 29 40.550781 29 40 C 29 39.183594 29.621094 38.121094 30.78125 36.84375 C 31.941406 35.566406 33.566406 34.121094 35.21875 32.46875 C 38.523438 29.164063 42 24.894531 42 19 C 42 9.761719 34.597656 2.25 25.40625 2.03125 C 25.273438 2.011719 25.136719 2 25 2 Z M 25 4 C 25.066406 4 25.136719 4.003906 25.21875 4.03125 C 25.46875 4.109375 25.789063 4.328125 26.15625 4.8125 C 26.648438 5.460938 27.132813 6.515625 27.5625 7.875 C 28.421875 10.59375 29 14.527344 29 19 C 29 24.398438 28.050781 27.984375 27.0625 31.0625 C 26.179688 33.816406 25.253906 36.210938 25.0625 39 L 24.9375 39 C 24.75 36.152344 23.824219 33.753906 22.9375 31 C 21.949219 27.929688 21 24.378906 21 19 C 21 14.667969 21.574219 10.757813 22.4375 8 C 22.867188 6.621094 23.378906 5.515625 23.875 4.84375 C 24.246094 4.339844 24.546875 4.113281 24.78125 4.03125 C 24.859375 4.003906 24.9375 4 25 4 Z M 28.8125 5.4375 C 29.777344 6.128906 30.714844 7.046875 31.5625 8.1875 C 33.558594 10.871094 35 14.664063 35 19 C 35 24.25 32.90625 27.4375 30.6875 30.375 C 29.910156 31.402344 29.097656 32.398438 28.375 33.4375 C 28.558594 32.875 28.742188 32.300781 28.9375 31.6875 C 29.949219 28.535156 31 24.640625 31 19 C 31 14.359375 30.453125 10.285156 29.5 7.28125 C 29.285156 6.605469 29.070313 6 28.8125 5.4375 Z M 21.21875 5.46875 C 20.957031 6.050781 20.71875 6.675781 20.5 7.375 C 19.550781 10.410156 19 14.496094 19 19 C 19 24.621094 20.050781 28.484375 21.0625 31.625 C 21.265625 32.253906 21.4375 32.828125 21.625 33.40625 C 20.898438 32.359375 20.09375 31.34375 19.3125 30.3125 C 17.09375 27.382813 15 24.226563 15 19 C 15 14.808594 16.4375 11.003906 18.4375 8.28125 C 19.289063 7.121094 20.25 6.175781 21.21875 5.46875 Z M 17.84375 5.8125 C 17.484375 6.214844 17.144531 6.640625 16.8125 7.09375 C 14.558594 10.164063 13 14.355469 13 19 C 13 24.773438 15.40625 28.492188 17.6875 31.5 C 18.664063 32.789063 19.597656 33.941406 20.34375 35.09375 C 19.128906 33.808594 17.667969 32.480469 16.21875 31.03125 C 13.023438 27.835938 10 24.105469 10 19 C 10 13.296875 13.167969 8.351563 17.84375 5.8125 Z M 32.28125 5.90625 C 36.882813 8.464844 40 13.351563 40 19 C 40 24.105469 36.976563 27.835938 33.78125 31.03125 C 32.375 32.4375 30.972656 33.746094 29.78125 35 C 30.507813 33.90625 31.378906 32.796875 32.3125 31.5625 C 34.59375 28.539063 37 24.792969 37 19 C 37 14.222656 35.414063 10.039063 33.15625 7 C 32.875 6.621094 32.582031 6.25 32.28125 5.90625 Z M 21.8125 42 C 21.335938 42.089844 20.992188 42.511719 21 43 L 21 46 C 21 47.09375 21.90625 48 23 48 L 27 48 C 28.09375 48 29 47.09375 29 46 L 29 43 C 29 42.449219 28.550781 42 28 42 L 22 42 C 21.96875 42 21.9375 42 21.90625 42 C 21.875 42 21.84375 42 21.8125 42 Z M 23 44 L 27 44 L 27 46 L 23 46 Z" fill="#edf2f4"/></svg>`;
			}
			case "mint": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#edf2f4" width="30"><path d="M 25.027344 2.9902344 A 1.0001 1.0001 0 0 0 24.943359 2.9921875 A 1.0001 1.0001 0 0 0 24.863281 3 L 14.570312 3 L 14.275391 3.3105469 L 0.97460938 17.310547 A 1.0009098 1.0009098 0 0 0 0.97265625 17.3125 L 0.3828125 17.933594 L 0.88476562 18.578125 A 1.0009098 1.0009098 0 0 0 0.9609375 18.675781 L 24.128906 48.509766 A 1.0001 1.0001 0 0 0 24.300781 48.730469 L 25 49.630859 L 25.699219 48.730469 A 1.0001 1.0001 0 0 0 25.869141 48.511719 L 49.076172 18.630859 A 1.0009098 1.0009098 0 0 0 49.136719 18.550781 L 49.617188 17.933594 L 49.025391 17.310547 L 35.724609 3.3105469 L 35.429688 3 L 25.136719 3 A 1.0001 1.0001 0 0 0 25.03125 2.9902344 A 1.0001 1.0001 0 0 0 25.027344 2.9902344 z M 15.808594 5 L 22.707031 5 L 13.740234 14.658203 L 15.808594 5 z M 27.292969 5 L 34.191406 5 L 36.259766 14.658203 L 27.292969 5 z M 25 5.46875 L 35.707031 17 L 14.292969 17 L 25 5.46875 z M 13.277344 7.265625 L 11.191406 17 L 4.03125 17 L 4.9414062 16.041016 L 13.277344 7.265625 z M 36.722656 7.265625 L 45.96875 17 L 38.808594 17 L 36.722656 7.265625 z M 3.7421875 19 L 11.341797 19 L 20.9375 41.140625 L 3.7421875 19 z M 13.523438 19 L 36.476562 19 L 25 45.482422 L 13.523438 19 z M 38.658203 19 L 46.257812 19 L 29.064453 41.136719 L 38.658203 19 z" fill="#edf2f4"/></svg>`;
			}
			case "burn": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#edf2f4" width="30"><path d="M 21.894531 0 A 1.0001 1.0001 0 0 0 20.904297 0.91210938 C 20.284814 7.8693803 16.271374 12.443296 12.203125 17.1875 C 8.1348762 21.931704 4 26.881987 4 34.300781 C 4 39.442877 6.2836272 43.416187 9.2792969 46.039062 C 12.274967 48.661938 15.94697 50 19 50 A 1.0001 1.0001 0 1 0 19 48 C 16.55303 48 13.225033 46.837281 10.595703 44.535156 C 7.9663729 42.233031 6 38.858685 6 34.300781 C 6 27.619576 9.663952 23.219077 13.720703 18.488281 C 17.466379 14.120247 21.405145 9.4058103 22.542969 2.7070312 C 37.751237 13.321032 44 24.135179 44 32.300781 C 44 39.997489 39.25589 46.166922 34.619141 48.076172 A 1.0001 1.0001 0 1 0 35.380859 49.923828 C 40.94411 47.633078 46 40.804073 46 32.300781 C 46 22.891418 38.917639 11.278943 22.458984 0.171875 A 1.0001 1.0001 0 0 0 21.894531 0 z M 25.794922 15.400391 A 1.0001 1.0001 0 0 0 24.814453 16.572266 C 25.428056 20.082075 25.567994 22.95418 25.371094 25.123047 C 25.174193 27.291914 24.611466 28.738031 24.03125 29.408203 C 23.451034 30.078375 23.024791 30.18046 22.15625 29.810547 C 21.287709 29.440634 20.074875 28.358132 18.837891 26.455078 A 1.0001 1.0001 0 0 0 17.197266 26.404297 C 13.446828 31.45697 13.598509 35.484669 14.90625 38.085938 C 16.213991 40.687204 18.535156 41.884766 18.535156 41.884766 A 1.0001 1.0001 0 1 0 19.464844 40.115234 C 19.464844 40.115234 17.685618 39.161233 16.693359 37.1875 C 15.790314 35.391225 15.570163 32.700421 18.111328 28.740234 C 19.169128 30.100594 20.239083 31.167434 21.373047 31.650391 C 22.845131 32.277353 24.510685 31.909125 25.542969 30.716797 C 26.575253 29.524469 27.144557 27.713945 27.363281 25.304688 C 27.515832 23.624336 27.403451 21.533779 27.154297 19.253906 C 29.844719 21.938634 32.041555 24.842877 32.925781 27.960938 C 34.036568 31.877921 33.492142 36.016533 30.291016 40.412109 A 1.0001 1.0001 0 1 0 31.908203 41.587891 C 35.407077 36.783467 36.113823 31.872078 34.849609 27.414062 C 33.585396 22.956048 30.444078 18.968047 26.439453 15.630859 A 1.0001 1.0001 0 0 0 25.794922 15.400391 z" fill="#edf2f4"/></svg>`;
			}
			case "nft receive": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#17bc76" width="30"><path d="M 64 6 C 48.5 6 33.9 12 23 23 C 11.7 34.3 6 49.1 6 64 C 6 78.9 11.7 93.7 23 105 C 34 116 48.5 122 64 122 C 79.5 122 94.1 116 105 105 C 127.6 82.4 127.6 45.6 105 23 C 94.1 12 79.5 6 64 6 z M 64 12 C 77.9 12 90.900781 17.399219 100.80078 27.199219 C 110.90078 37.399219 116 50.7 116 64 C 116 77.3 110.90078 90.600781 100.80078 100.80078 C 90.900781 110.60078 77.9 116 64 116 C 50.1 116 37.099219 110.60078 27.199219 100.80078 C 6.9992187 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.099219 17.399219 50.1 12 64 12 z M 64 43 C 62.3 43 61 44.3 61 46 L 61 76.800781 L 51.099609 66.900391 C 49.899609 65.700391 48.000391 65.700391 46.900391 66.900391 C 46.300391 67.500391 46 68.2 46 69 C 46 69.8 46.300391 70.499609 46.900391 71.099609 L 61.900391 86.099609 C 63.100391 87.299609 64.999609 87.299609 66.099609 86.099609 L 81.099609 71.099609 C 82.299609 69.899609 82.299609 68.000391 81.099609 66.900391 C 79.899609 65.700391 78.100391 65.700391 76.900391 66.900391 L 67 76.800781 L 67 46 C 67 44.3 65.7 43 64 43 z" fill="#17bc76"/></svg>`;
			}
			case "nft send": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#c7d5d3" width="30"><path d="M 64 6 C 48.5 6 33.9 12 23 23 C 11.7 34.3 6 49.1 6 64 C 6 78.9 11.7 93.7 23 105 C 34 116 48.5 122 64 122 C 79.5 122 94.1 116 105 105 C 127.6 82.4 127.6 45.6 105 23 C 94.1 12 79.5 6 64 6 z M 64 12 C 77.9 12 90.900781 17.399219 100.80078 27.199219 C 110.90078 37.399219 116 50.7 116 64 C 116 77.3 110.90078 90.600781 100.80078 100.80078 C 90.900781 110.60078 77.9 116 64 116 C 50.1 116 37.099219 110.60078 27.199219 100.80078 C 6.9992187 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.099219 17.399219 50.1 12 64 12 z M 63.962891 41 C 63.200391 41 62.450391 41.300391 61.900391 41.900391 L 46.900391 56.900391 C 46.300391 57.500391 46 58.2 46 59 C 46 59.8 46.300391 60.499609 46.900391 61.099609 C 48.100391 62.299609 49.999609 62.299609 51.099609 61.099609 L 61 51.199219 L 61 82 C 61 83.7 62.3 85 64 85 C 65.7 85 67 83.7 67 82 L 67 51.199219 L 76.900391 61.099609 C 78.100391 62.299609 79.999609 62.299609 81.099609 61.099609 C 82.299609 59.899609 82.299609 58.000391 81.099609 56.900391 L 66.099609 41.900391 C 65.499609 41.300391 64.725391 41 63.962891 41 z" fill="#c7d5d3"/></svg>`;
			}
			case "token send": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#c7d5d3" width="30"><path d="M 64 6 C 48.5 6 33.9 12 23 23 C 11.7 34.3 6 49.1 6 64 C 6 78.9 11.7 93.7 23 105 C 34 116 48.5 122 64 122 C 79.5 122 94.1 116 105 105 C 127.6 82.4 127.6 45.6 105 23 C 94.1 12 79.5 6 64 6 z M 64 12 C 77.9 12 90.900781 17.399219 100.80078 27.199219 C 110.90078 37.399219 116 50.7 116 64 C 116 77.3 110.90078 90.600781 100.80078 100.80078 C 90.900781 110.60078 77.9 116 64 116 C 50.1 116 37.099219 110.60078 27.199219 100.80078 C 6.9992187 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.099219 17.399219 50.1 12 64 12 z M 63.962891 41 C 63.200391 41 62.450391 41.300391 61.900391 41.900391 L 46.900391 56.900391 C 46.300391 57.500391 46 58.2 46 59 C 46 59.8 46.300391 60.499609 46.900391 61.099609 C 48.100391 62.299609 49.999609 62.299609 51.099609 61.099609 L 61 51.199219 L 61 82 C 61 83.7 62.3 85 64 85 C 65.7 85 67 83.7 67 82 L 67 51.199219 L 76.900391 61.099609 C 78.100391 62.299609 79.999609 62.299609 81.099609 61.099609 C 82.299609 59.899609 82.299609 58.000391 81.099609 56.900391 L 66.099609 41.900391 C 65.499609 41.300391 64.725391 41 63.962891 41 z" fill="#c7d5d3"/></svg>`;
			}
			case "token receive": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#17bc76" width="30"><path d="M 64 6 C 48.5 6 33.9 12 23 23 C 11.7 34.3 6 49.1 6 64 C 6 78.9 11.7 93.7 23 105 C 34 116 48.5 122 64 122 C 79.5 122 94.1 116 105 105 C 127.6 82.4 127.6 45.6 105 23 C 94.1 12 79.5 6 64 6 z M 64 12 C 77.9 12 90.900781 17.399219 100.80078 27.199219 C 110.90078 37.399219 116 50.7 116 64 C 116 77.3 110.90078 90.600781 100.80078 100.80078 C 90.900781 110.60078 77.9 116 64 116 C 50.1 116 37.099219 110.60078 27.199219 100.80078 C 6.9992187 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.099219 17.399219 50.1 12 64 12 z M 64 43 C 62.3 43 61 44.3 61 46 L 61 76.800781 L 51.099609 66.900391 C 49.899609 65.700391 48.000391 65.700391 46.900391 66.900391 C 46.300391 67.500391 46 68.2 46 69 C 46 69.8 46.300391 70.499609 46.900391 71.099609 L 61.900391 86.099609 C 63.100391 87.299609 64.999609 87.299609 66.099609 86.099609 L 81.099609 71.099609 C 82.299609 69.899609 82.299609 68.000391 81.099609 66.900391 C 79.899609 65.700391 78.100391 65.700391 76.900391 66.900391 L 67 76.800781 L 67 46 C 67 44.3 65.7 43 64 43 z" fill="#17bc76"/></svg>`;
			}
			case "nft purchase": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#c7d5d3" width="30"><path d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 25.984375 10.986328 A 1.0001 1.0001 0 0 0 25 12 L 25 13.054688 C 24.055482 12.681347 22.421875 12.09375 22.421875 12.09375 A 1.0001 1.0001 0 0 0 21.240234 13.650391 C 21.240234 13.650391 22.617038 15.265178 23.425781 17.691406 C 24.234524 20.117635 24.483946 23.20021 22.185547 26.417969 A 1.0001 1.0001 0 0 0 23 28 L 25 28 L 25 30 L 22 30 C 20.883334 30 20 29.116666 20 28 A 1.0001 1.0001 0 0 0 19 27 L 11 27 A 1.0001 1.0001 0 0 0 10.023438 28.216797 L 10.333984 29.613281 C 11.421423 34.507308 15.773061 38 20.787109 38 L 28.910156 38 C 32.375832 38 35.462701 35.775961 36.558594 32.488281 C 36.724857 31.989493 37.081901 31.577214 37.552734 31.341797 L 40.447266 29.894531 A 1.0001 1.0001 0 0 0 41 29 L 41 27 A 1.0001 1.0001 0 0 0 39.724609 26.039062 L 32.724609 28.039062 A 1.0001 1.0001 0 0 0 32.445312 28.167969 L 30.076172 29.748047 C 29.82962 29.912415 29.539155 30 29.242188 30 L 27 30 L 27 28 L 30 28 A 1.0001 1.0001 0 0 0 30.574219 27.818359 C 30.574219 27.818359 32.84152 26.301375 33.587891 23.654297 C 33.961076 22.330758 33.899812 20.693659 32.984375 19.035156 C 32.068938 17.376654 30.359452 15.700268 27.509766 14.007812 A 1.0001 1.0001 0 0 0 27.296875 13.912109 C 27.117721 13.85633 27.171477 13.856266 27 13.800781 L 27 12 A 1.0001 1.0001 0 0 0 25.984375 10.986328 z M 18.996094 14 A 1.0001 1.0001 0 0 0 18.142578 14.486328 L 12.142578 24.486328 A 1.0001 1.0001 0 0 0 13 26 L 20 26 A 1.0001 1.0001 0 0 0 20.857422 25.513672 C 20.857422 25.513672 24.136768 19.819397 19.78125 14.375 A 1.0001 1.0001 0 0 0 18.996094 14 z M 24.302734 14.923828 C 25.127592 15.250025 25.230851 15.344863 26.535156 15.759766 C 29.148489 17.320921 30.560983 18.781964 31.234375 20.001953 C 31.912688 21.230857 31.913924 22.218242 31.662109 23.111328 C 31.211365 24.70994 29.917488 25.766609 29.621094 26 L 24.652344 26 C 26.309158 22.731952 26.134598 19.489732 25.324219 17.058594 C 25.029979 16.175876 24.659832 15.594273 24.302734 14.923828 z M 18.939453 17.042969 C 20.855069 20.622664 19.637075 23.407915 19.304688 24 L 14.765625 24 L 18.939453 17.042969 z M 39 28.326172 L 39 28.382812 L 36.658203 29.552734 C 35.713037 30.025318 34.993893 30.854257 34.660156 31.855469 C 33.834049 34.333789 31.522481 36 28.910156 36 L 20.787109 36 C 16.699158 36 13.17367 33.16966 12.287109 29.179688 L 12.248047 29 L 18.203125 29 C 18.659479 30.706363 20.156406 32 22 32 L 29.242188 32 C 29.933218 32 30.610099 31.795741 31.185547 31.412109 L 33.425781 29.917969 L 39 28.326172 z" fill="#c7d5d3"/></svg>`;
			}
			case "nft sale": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#c7d5d3" width="30"><path d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 25.984375 10.986328 A 1.0001 1.0001 0 0 0 25 12 L 25 13.054688 C 24.055482 12.681347 22.421875 12.09375 22.421875 12.09375 A 1.0001 1.0001 0 0 0 21.240234 13.650391 C 21.240234 13.650391 22.617038 15.265178 23.425781 17.691406 C 24.234524 20.117635 24.483946 23.20021 22.185547 26.417969 A 1.0001 1.0001 0 0 0 23 28 L 25 28 L 25 30 L 22 30 C 20.883334 30 20 29.116666 20 28 A 1.0001 1.0001 0 0 0 19 27 L 11 27 A 1.0001 1.0001 0 0 0 10.023438 28.216797 L 10.333984 29.613281 C 11.421423 34.507308 15.773061 38 20.787109 38 L 28.910156 38 C 32.375832 38 35.462701 35.775961 36.558594 32.488281 C 36.724857 31.989493 37.081901 31.577214 37.552734 31.341797 L 40.447266 29.894531 A 1.0001 1.0001 0 0 0 41 29 L 41 27 A 1.0001 1.0001 0 0 0 39.724609 26.039062 L 32.724609 28.039062 A 1.0001 1.0001 0 0 0 32.445312 28.167969 L 30.076172 29.748047 C 29.82962 29.912415 29.539155 30 29.242188 30 L 27 30 L 27 28 L 30 28 A 1.0001 1.0001 0 0 0 30.574219 27.818359 C 30.574219 27.818359 32.84152 26.301375 33.587891 23.654297 C 33.961076 22.330758 33.899812 20.693659 32.984375 19.035156 C 32.068938 17.376654 30.359452 15.700268 27.509766 14.007812 A 1.0001 1.0001 0 0 0 27.296875 13.912109 C 27.117721 13.85633 27.171477 13.856266 27 13.800781 L 27 12 A 1.0001 1.0001 0 0 0 25.984375 10.986328 z M 18.996094 14 A 1.0001 1.0001 0 0 0 18.142578 14.486328 L 12.142578 24.486328 A 1.0001 1.0001 0 0 0 13 26 L 20 26 A 1.0001 1.0001 0 0 0 20.857422 25.513672 C 20.857422 25.513672 24.136768 19.819397 19.78125 14.375 A 1.0001 1.0001 0 0 0 18.996094 14 z M 24.302734 14.923828 C 25.127592 15.250025 25.230851 15.344863 26.535156 15.759766 C 29.148489 17.320921 30.560983 18.781964 31.234375 20.001953 C 31.912688 21.230857 31.913924 22.218242 31.662109 23.111328 C 31.211365 24.70994 29.917488 25.766609 29.621094 26 L 24.652344 26 C 26.309158 22.731952 26.134598 19.489732 25.324219 17.058594 C 25.029979 16.175876 24.659832 15.594273 24.302734 14.923828 z M 18.939453 17.042969 C 20.855069 20.622664 19.637075 23.407915 19.304688 24 L 14.765625 24 L 18.939453 17.042969 z M 39 28.326172 L 39 28.382812 L 36.658203 29.552734 C 35.713037 30.025318 34.993893 30.854257 34.660156 31.855469 C 33.834049 34.333789 31.522481 36 28.910156 36 L 20.787109 36 C 16.699158 36 13.17367 33.16966 12.287109 29.179688 L 12.248047 29 L 18.203125 29 C 18.659479 30.706363 20.156406 32 22 32 L 29.242188 32 C 29.933218 32 30.610099 31.795741 31.185547 31.412109 L 33.425781 29.917969 L 39 28.326172 z" fill="#c7d5d3"/></svg>`;
			}
			case "token swap": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#fb118e" width="30"><path d="M 16 0 C 7.178 0 0 7.178 0 16 C 0 24.822 7.178 32 16 32 C 16.041 32 16.076187 31.996094 16.117188 31.996094 C 17.041187 23.657094 23.657094 17.041187 31.996094 16.117188 C 31.996094 16.076187 32 16.041 32 16 C 32 7.178 24.822 0 16 0 z M 39.292969 0.29296875 L 33.585938 6 L 39.292969 11.707031 L 40.707031 10.292969 L 37.414062 7 L 42 7 C 44.754545 7 47 9.2454545 47 12 L 47 18 L 49 18 L 49 12 C 49 8.1545455 45.845455 5 42 5 L 37.414062 5 L 40.707031 1.7070312 L 39.292969 0.29296875 z M 16 4 C 16.552 4 17 4.448 17 5 L 17 6.734375 C 18.108 6.871375 19.040219 7.341 19.699219 8 C 20.399219 8.7 20.899219 9.7996094 21.199219 11.099609 L 19.300781 11.099609 C 19.015781 9.6746094 18.273 8.8876875 17 8.5546875 L 17 14.0625 L 18.099609 14.400391 C 18.399609 14.500391 18.699609 14.600781 19.099609 14.800781 C 19.499609 15.000781 19.900781 15.199609 20.300781 15.599609 C 20.700781 15.899609 20.999219 16.300781 21.199219 16.800781 C 21.499219 17.300781 21.599609 17.899609 21.599609 18.599609 C 21.599609 19.299609 21.499219 20 21.199219 20.5 C 20.999219 21.1 20.599219 21.6 20.199219 22 C 19.799219 22.4 19.299219 22.7 18.699219 23 C 18.179219 23.173 17.651 23.339812 17 23.382812 L 17 25 C 17 25.552 16.552 26 16 26 C 15.448 26 15 25.552 15 25 L 15 23.322266 C 13.739 23.133266 12.706 22.595781 12 21.800781 C 11.1 20.900781 10.6 19.699609 10.5 18.099609 L 12.400391 18.099609 C 12.300391 19.199609 12.699219 20 13.199219 20.5 C 13.705219 21.006 14.291 21.293188 15 21.492188 L 15 15.595703 C 14.369 15.429703 13.814391 15.265609 13.400391 15.099609 C 12.800391 14.899609 12.4 14.598828 12 14.298828 C 11.6 13.998828 11.299219 13.599609 11.199219 13.099609 C 10.999219 12.599609 10.900391 12.098437 10.900391 11.398438 C 10.900391 10.698438 11.000781 10.099609 11.300781 9.5996094 C 11.500781 8.9996094 11.900781 8.5996094 12.300781 8.0996094 C 12.700781 7.6996094 13.200781 7.3996094 13.800781 7.0996094 C 14.200781 6.9666094 14.6 6.8376719 15 6.7636719 L 15 5 C 15 4.448 15.448 4 16 4 z M 15 8.6347656 C 14.506 8.7057656 13.991609 8.9087813 13.599609 9.3007812 C 13.099609 9.7007813 12.900391 10.399219 12.900391 11.199219 C 12.900391 11.599219 12.999609 11.899219 13.099609 12.199219 C 13.199609 12.499219 13.399609 12.700391 13.599609 12.900391 C 13.799609 13.100391 14.100391 13.200391 14.400391 13.400391 C 14.580391 13.460391 14.791 13.551625 15 13.640625 L 15 8.6347656 z M 17 16.208984 L 17 21.623047 C 17.293 21.548047 17.577781 21.474391 17.800781 21.400391 C 18.100781 21.300391 18.499219 21.100391 18.699219 20.900391 C 18.999219 20.700391 19.200781 20.4 19.300781 20 C 19.400781 19.7 19.5 19.200781 19.5 18.800781 C 19.5 18.400781 19.400781 17.999219 19.300781 17.699219 C 19.200781 17.399219 18.999219 17.2 18.699219 17 C 18.399219 16.8 18.100781 16.6 17.800781 16.5 C 17.509781 16.427 17.262 16.310984 17 16.208984 z M 34 18 C 25.178 18 18 25.178 18 34 C 18 42.822 25.178 50 34 50 C 42.822 50 50 42.822 50 34 C 50 25.178 42.822 18 34 18 z M 33 23.857422 L 33 35.675781 L 27.484375 34.099609 L 33 23.857422 z M 35 23.857422 L 40.515625 34.099609 L 35 35.675781 L 35 23.857422 z M 1 32 L 1 38 C 1 41.845455 4.1545455 45 8 45 L 11.585938 45 L 8.2929688 48.292969 L 9.7070312 49.707031 L 15.414062 44 L 9.7070312 38.292969 L 8.2929688 39.707031 L 11.585938 43 L 8 43 C 5.2454545 43 3 40.754545 3 38 L 3 32 L 1 32 z M 27.808594 36.271484 L 33 37.753906 L 33 38.042969 L 33 44.427734 L 27.808594 36.271484 z M 40.191406 36.271484 L 35 44.427734 L 35 38.042969 L 35 37.753906 L 40.191406 36.271484 z" fill="#fb118e"/></svg>`;
			}
			case "approve": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#c7d5d3" width="25"><path d="M 24 1 C 11.32 1 1 11.32 1 24 L 1 54.75 C 1 56.41 2.34 57.75 4 57.75 C 5.66 57.75 7 56.41 7 54.75 L 7 24 C 7 14.63 14.63 7 24 7 L 104 7 C 113.37 7 121 14.63 121 24 L 121 35 C 121 36.66 122.34 38 124 38 C 125.66 38 127 36.66 127 35 L 127 24 C 127 11.32 116.68 1 104 1 L 24 1 z M 109 46 C 99.08 46 91 54.07 91 64 C 91 73.93 99.08 82 109 82 L 124 82 C 125.66 82 127 80.66 127 79 L 127 49 C 127 47.34 125.66 46 124 46 L 109 46 z M 39 51 C 18.05 51 1 68.05 1 89 C 1 109.95 18.05 127 39 127 C 59.95 127 77 109.95 77 89 C 77 68.05 59.95 51 39 51 z M 109 52 L 121 52 L 121 76 L 109 76 C 102.38 76 97 70.62 97 64 C 97 57.38 102.38 52 109 52 z M 39 57 C 56.64 57 71 71.35 71 89 C 71 106.65 56.64 121 39 121 C 21.36 121 7 106.65 7 89 C 7 71.35 21.36 57 39 57 z M 58.113281 77.001953 C 57.347031 76.971953 56.570938 77.235781 55.960938 77.800781 L 36.480469 95.880859 L 28.070312 87.830078 C 26.870313 86.690078 24.980078 86.729922 23.830078 87.919922 C 22.680078 89.119922 22.729922 91.020156 23.919922 92.160156 L 34.380859 102.16992 C 34.960859 102.71992 35.709219 103 36.449219 103 C 37.179219 103 37.910234 102.72922 38.490234 102.19922 L 60.039062 82.199219 C 61.249063 81.069219 61.329219 79.170938 60.199219 77.960938 C 59.634219 77.355938 58.879531 77.031953 58.113281 77.001953 z M 124 90 C 122.34 90 121 91.34 121 93 L 121 104 C 121 113.37 113.37 121 104 121 L 73.25 121 C 71.59 121 70.25 122.34 70.25 124 C 70.25 125.66 71.59 127 73.25 127 L 104 127 C 116.68 127 127 116.68 127 104 L 127 93 C 127 91.34 125.66 90 124 90 z" fill="#c7d5d3"/></svg>`;
			}
			case "borrow": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#edf2f4" width="25"><path d="M 25 2 C 12.318 2 2 12.318 2 25 C 2 37.682 12.318 48 25 48 C 28.658 48 32.115453 47.137328 35.189453 45.611328 C 34.856453 45.003328 34.600109 44.375094 34.412109 43.746094 C 31.576109 45.176094 28.386 46 25 46 C 13.42 46 4 36.58 4 25 C 4 13.42 13.42 4 25 4 C 36.58 4 46 13.42 46 25 C 46 25.164 45.978609 25.322328 45.974609 25.486328 C 46.724609 25.753328 47.375406 26.123547 47.941406 26.560547 C 47.976406 26.043547 48 25.525 48 25 C 48 12.318 37.682 2 25 2 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.175781 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.707031 27.707031 A 3 3 0 0 0 25 28 A 3 3 0 0 0 26 22.171875 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z M 42 25 L 42 27.068359 C 39.89024 27.354554 38.566692 28.525064 37.925781 29.681641 C 37.188787 31.011609 37.199219 32.330078 37.199219 32.330078 C 37.199219 34.11771 38.112025 35.487719 39.294922 36.357422 C 40.477819 37.227125 41.903894 37.730823 43.253906 38.228516 C 44.603919 38.726208 45.878594 39.216896 46.720703 39.835938 C 47.562812 40.454977 48 41.068933 48 42.25 C 48 42.25 47.9936 43.158781 47.404297 44.091797 C 46.815023 45.024813 45.736111 46 43 46 C 40.329889 46 39.271581 44.825084 38.642578 43.580078 C 38.013576 42.335073 38 41.0625 38 41.0625 L 36 41.0625 C 36 41.0625 35.98642 42.758427 36.857422 44.482422 C 37.636428 46.024335 39.280892 47.611381 42 47.931641 L 42 50 L 44 50 L 44 47.945312 C 46.65842 47.690575 48.282942 46.445075 49.095703 45.158203 C 50.00643 43.716219 50 42.25 50 42.25 C 50 40.462567 49.087188 39.094162 47.904297 38.224609 C 46.721406 37.355057 45.295301 36.851198 43.945312 36.353516 C 42.595326 35.855833 41.322572 35.365234 40.480469 34.746094 C 39.638366 34.126953 39.199219 33.511446 39.199219 32.330078 C 39.199219 32.330078 39.210819 31.485922 39.673828 30.650391 C 40.136834 29.814859 40.900764 29 43 29 C 45.166667 29 45.974726 29.93578 46.480469 30.947266 C 46.986212 31.958752 47 33 47 33 L 49 33 C 49 33 49.01379 31.541248 48.269531 30.052734 C 47.617411 28.748494 46.23756 27.387637 44 27.070312 L 44 25 L 42 25 z" fill="#edf2f4"/></svg>`;
			}
			case "contract interaction": {
				return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#c7d5d3" width="25"><path d="M 24 1 C 11.32 1 1 11.32 1 24 C 1 25.66 2.34 27 4 27 C 5.66 27 7 25.66 7 24 C 7 14.63 14.63 7 24 7 L 104 7 C 113.37 7 121 14.63 121 24 L 121 35 C 121 36.66 122.34 38 124 38 C 125.66 38 127 36.66 127 35 L 127 24 C 127 11.32 116.68 1 104 1 L 24 1 z M 35 20 C 28.38 20 23 25.38 23 32 C 23 34.22 23.619922 36.300078 24.669922 38.080078 L 16.759766 46 L 4 46 C 2.34 46 1 47.34 1 49 C 1 50.66 2.34 52 4 52 L 18 52 C 18.8 52 19.559141 51.679141 20.119141 51.119141 L 28.919922 42.320312 C 30.699922 43.380313 32.78 44 35 44 C 41.62 44 47 38.62 47 32 C 47 25.38 41.62 20 35 20 z M 35 26 C 38.31 26 41 28.69 41 32 C 41 35.31 38.31 38 35 38 C 31.69 38 29 35.31 29 32 C 29 28.69 31.69 26 35 26 z M 109 46 C 99.08 46 91 54.07 91 64 C 91 73.93 99.08 82 109 82 L 124 82 C 125.66 82 127 80.66 127 79 L 127 49 C 127 47.34 125.66 46 124 46 L 109 46 z M 68 52 C 62.42 52 57.730625 55.83 56.390625 61 L 4 61 C 2.34 61 1 62.34 1 64 C 1 65.66 2.34 67 4 67 L 56.390625 67 C 57.730625 72.17 62.42 76 68 76 C 74.62 76 80 70.62 80 64 C 80 57.38 74.62 52 68 52 z M 109 52 L 121 52 L 121 76 L 109 76 C 102.38 76 97 70.62 97 64 C 97 57.38 102.38 52 109 52 z M 68 58 C 71.31 58 74 60.69 74 64 C 74 67.31 71.31 70 68 70 C 64.69 70 62 67.31 62 64 C 62 60.69 64.69 58 68 58 z M 4 76 C 2.34 76 1 77.34 1 79 C 1 80.66 2.34 82 4 82 L 9.7597656 82 L 25.880859 98.119141 C 26.440859 98.679141 27.2 99 28 99 L 33.390625 99 C 34.730625 104.17 39.42 108 45 108 C 51.62 108 57 102.62 57 96 C 57 89.38 51.62 84 45 84 C 39.42 84 34.730625 87.83 33.390625 93 L 29.240234 93 L 13.119141 76.880859 C 12.559141 76.320859 11.8 76 11 76 L 4 76 z M 45 90 C 48.31 90 51 92.69 51 96 C 51 99.31 48.31 102 45 102 C 41.69 102 39 99.31 39 96 C 39 92.69 41.69 90 45 90 z M 124 90 C 122.34 90 121 91.34 121 93 L 121 104 C 121 113.37 113.37 121 104 121 L 24 121 C 14.63 121 7 113.37 7 104 C 7 102.34 5.66 101 4 101 C 2.34 101 1 102.34 1 104 C 1 116.68 11.32 127 24 127 L 104 127 C 116.68 127 127 116.68 127 104 L 127 93 C 127 91.34 125.66 90 124 90 z" fill="#c7d5d3"/></svg>`;
			}
			default:
				return "";
		}
	}

	return <div dangerouslySetInnerHTML={{ __html: getIcon(category) }} />;
}

export default HistoryIconv2;
