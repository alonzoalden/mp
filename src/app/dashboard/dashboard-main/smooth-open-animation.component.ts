import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';
  
export const growContainerAnimation = animation([
    style({
        height: '0',
        'padding-top': '0',
        'padding-bottom': '0',
        'margin-top': '0',
        'margin-bottom': '0'
    }),
    animate("0.5s ease", style({ height: '*', 'padding-top': '*', 'padding-bottom': '*', 'margin-top': '*', 'margin-bottom': '*' }))
]);

export const shinkContainerAnimation = animation([
    style({ height: '*', 'padding-top': '*', 'padding-bottom': '*', 'margin-top': '*', 'margin-bottom': '*' }),
    animate("0.1s ease", style({ height: '0', 'padding-top': '0', 'padding-bottom': '0', 'margin-top': '0', 'margin-bottom': '0' }))
]);