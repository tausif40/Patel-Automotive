import React from 'react';
import './loader.css';

function Loader() {
	return (
		<>
			<div class="container">
				<div class="loading">
					<div class="loading__letter">L</div>
					<div class="loading__letter">o</div>
					<div class="loading__letter">a</div>
					<div class="loading__letter">d</div>
					<div class="loading__letter">i</div>
					<div class="loading__letter">n</div>
					<div class="loading__letter">g</div>
					<div class="loading__letter">.</div>
					<div class="loading__letter">.</div>
					<div class="loading__letter">.</div>
				</div>
			</div>
		</>
	)
}

export default Loader;