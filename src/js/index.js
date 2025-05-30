import 'normalize.css';
import '../less/style.less';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';


// Call API
// Insert result into state
// Handle events to sort and filter

// Render React component
const root = createRoot(document.getElementById('event-results'));
root.render(
    <article>
      <h2 class="h3">[10]<a href="#">Title of Event Goes Here</a></h2>
      <p class="hug">A short description will go here</p>
      <p class="hug"><a href="#">Link to source article</a></p>
      <span class="type small">[Tag]</span> / <span class="subtype">Subtype, Another subtype, Arbitrary number of them</span>
    </article>
  );
