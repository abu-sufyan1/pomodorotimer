# Golden Ratio Pomodoro Timer Widget

This repository contains a static HTML widget for a **Pomodoro Timer** that implements the **golden ratio** (1.61) for dividing an hour between focus and break periods. It is forked from an original project, with the following customizations:  
- **Focus time**: Increased to **37 minutes** (instead of 25 minutes).  
- **Break time**: Extended to **22 minutes** (instead of 5 minutes).  

The updated focus-to-break ratio aims to create a more balanced and natural workflow aligned with the golden ratio.

## Features
- **Simple and static**: No backend required, purely HTML, CSS, and JavaScript.
- **Customizable timer durations**: Easily tweak the focus, short break, and long break durations.
- **Responsive design**: Works well on both desktop and mobile devices.

## How It Works
This widget divides an hour such that the focus-to-break ratio approximates the **golden ratio (1.61)**:
- **37 minutes** for focused work.
- **22 minutes** for a break.

The cycle repeats throughout your session, promoting productivity while preventing burnout.

## Customizations
In addition to the golden ratio timings, we've introduced code-level flexibility to allow users to set custom durations for:
1. **Focus time**  
2. **Short break time**  
3. **Long break time**  

To customize these durations:
1. Open the `main.js` file (or the relevant JavaScript file).
2. Modify the following variables to suit your preferences:
   ```javascript
   const focusDuration = 37 * 60; // Default: 37 minutes in seconds
   const shortBreakDuration = 22 * 60; // Default: 22 minutes in seconds
   const longBreakDuration = 30 * 60; // Default: 30 minutes in seconds
