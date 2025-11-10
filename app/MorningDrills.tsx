/*
///// PRACTICING THE ART OF PROBLEM SOLVING BANALS /// FUNDAMENTALS FROM MATHEMATICIAN GEORGE POLYA //////

Quick React Warm-up Drill: "Debounced Auto-Save"

Build a text input that saves to localStorage 2 seconds after the user stops typing.

Requirements:

Show "Typing..." while user is actively typing
Show "Saving..." during the 2-second countdown
Show "Saved ✓" after successfully saving
If user types again before 2 seconds, reset the timer
Load saved value on mount


/* SOLVING START - 9;36 AM 10 11 JUNE 2025
###TIME
- time give myself up to 9;52 to understand the problem
- up to 9;57 to plan solution
- up to 10;02 to solve
- up to 10;07 to code
///////////////// need to re-plan timelines (for practice and debrief on prob sol process but I see it's inefficient - for now I need to first gather up all that cannot be skipped, later trim it and make adaptable so any problem = hyper efficient approach) /// also important - word/typing based problem understanding exploration = inefficient format?
/////////////////
- up to 10;00 or earlier understand the problem /// tentatively done 10;03 (my perfectionist tendencies? I realize it's NOT complete...perhaps for practice purposes I should just take as long as I need? for now, moving on - if need be, i'll make another exercise where I will spend as much as needed on understanding phase)
- 10;03 plan
- 10;06 solve
- 10;09 code
///////////////// again (this is a drill - it's purpose is to take it slow and examine my thought process, especially on a simple problem - all such fundamentals are present in ANY PROBLEM SOLVED ANYWHERE 24/7 100% EVERYWHERE...so no, so long as I give it my all with my fullest energy - it's not a waste of time, it's the most important thing upon which all else stands...)
/////////////////
- 10;10 plan
- 10;15 solve
- 10;20 code
////////////////
- it's 10;12, I took a small break because I felt and saw my thoughts just stopped being effective and it made sense
- but holy shit, it's 10;13 now - TIME IS SLIPPIN'
- this pattern is very similar to macro pattern of how long the big project is taking me and how sometimes a relatively small 10-20 minute task takes me hours
- i feel like there's something wrong...i am trying as best as i can, as balanced and measured and precise as i can etc. - my very best - and this is how it looks
- ^I M P O R T A N T, #1 IMPORTANT NOTE TO LOOK AT!!!!!!!!!!!!!!!!!!
- 10;27 I notice how ambitious I am to care for quality and how that can be a problem - I looked at stack overflow to see how to detect input stopped typing event - and the solution to re-launch setTimeout after every keystroke seems very suboptimal to me, so I keep looking and thinking for something better...
- HOLY SHIT. I COMPLETELY FORGOT ABOUT "DEBOUNCED". WOW. I ONLY NOW REMEMBERED IT BECAUSE I LOOKED FOR THAT SET TIMEOUT STUFF.
// - so at that point, I felt overwhelmed and it was somewhat demoralizing, given "how simple and small this challenge is"..., I needed another break
// - now it's 10;44
// - THIS IS I M P O R T A N T !!!!!!!!!!!!!!!!!!!!!!!!!!
// - this is like fishing out that weakness - that root cause - whatever that is (I don't yet know, I don't see it - all the blabber and bullshit and jump to conclusion previous attempts to identify it were absolutely false and inaccurate, misshaped, not quite capturing the exact geometry of what's wrong and thus missing me and thus me continuing to not be able to actually fix it - but now, it's like having it on higher resolution display - there' a chance
// 10;46 now, continuing
// exploring - why do i need debounce for that? do i? below is my Q to AI
// 10;59
- Okay, I need debounce because debounce means "reset f execution on every re-trigger"
- HOLY SHIT I SET SNOOZE ON COPILOT FOR SOME BIG AMOUNT OF TIME, LIKE 80 MINUTES - AND NOW IT JUST RUN OUT....THAT'S HOW MUCH TIME IT TAKES ME.... but bear in mind, it involves all these notes here for debrief purposes - I want that core weakness vs time, that lack of speed, that total repeated blowouts problem - on high resolution display
///////////////////// FOR DEBRIEF - THIS "MIDDLE PART" COMMENTS SEGMENT IS BY FAR #1 MOST IMPORTANT - IT CONTAINS TIMELINE PLANS AND ACTUAL RESULTING TIMELINES REALITY - IT HIGHLIGHTS MY WEAKNESS VS TIME, SPEED WEAKNESS - CRITICAL INFORMATION TO GET AT WHAT IS THE ROOT CAUSE OF THAT, WHAT IS THAT WEAKNESS ( I ONLY SEE THE EFFECT, NOT THE ROOT CAUSE - I DON'T KNOW WHY IT'S GOING LIKE THAT...I WENT OVER THIS TIME AND AGAIN BUT ANY GENERIC FEEDBACK IS JUST PURE FALSEHOOD AND STUPID INACCURATE SHIT THAT'S JUST NOT WRONG/RIGHT - IT'S JUST IRRELEVANT AND DOESN'T PENETRATE TO THE CAUSE AT ALL, IT'S JUST BAD QUALITY JUMBO SHIT AND NOT REAL HOLISTIC+PENETRATING DEEP SYSTEMATIC INQUIRY THAT REMAINS SUPER HONEST TO WHAT IT CAN'T KNOW AND DOESN'T FALSELY FAIL TO ACCOUNT FOR UNKNOWN POSSIBILITIES - AND THIS IS THE ONLY THING THAT CAN HELP ME SOLVE IT - SYSTEMATIC AND HONEST ENOUGH EXPLORATION AND ORGANIZING OF POSSIBILITIES OF WHAT MIGHT BE CAUSING IT AND WHAT ARE OTHER POSSIBLE WAYS OF OPERATING THAT WOULD HELP ME GET AROUND/PREVENT THAT WEAKNESS/SOLVE THAT ROOT CAUSE ) //////////////////////////////////
// 11;10
// 11;21 - this is total blow out, this is taking WAY TOO LONG - is it the right call to try to assemble full solution in comments before coding? FOR 100% SURE YES. It's not the bottleneck here. You can do that super easily and if you can't - there's some root cause underneath. Some bundle of unclarities. Some confusions/mix up's.
///////////////////////// IMPORTANT^////////////////////////////////////////
11;22 break; making scrambled eggs WC BIO BREAK 11;42
//  10 MINUTES NOW
///////////////// IMPORTANT - THIS IS ABOUT IMPROVING THE PROBLEM SOLVING MACHINE, IT'S ABOUT PROCESS - THE PROBLEM IS A GREAT "SAMPLE" TO SEE WHAT I AM DOING - AND IT'S IMPORTANT TO NOTE THAT CONTEXT IS FROM YESTERDAY'S DELIBERATE PRACTICE ON PROBLEM SOLVING BANALS - I AM TESTING THOSE ON A SIMPLE DRILL















///////////////////// IMPORTANT FOR DEBRIEF - these timelines didn't happen, takes way longer, look notes above
10;14 - continuing
by 10;20 plan
10;25 solve
10;30 code
///////////////////// these timelines didn't happen, takes way longer, look notes above

//////////////////////////////////////////////////////////////////////////

Q to AI: why do I need debounce? Articulating my thoughts:
// input user stopped typing event



debounce



i don't understand how debounce fits in because

if user typed in blablabla



it's 8-9x new timeout and clear timeout and new timeout, yes, for e.g. 0.4 sec

but if i debounce that, then there is risk that

stopped typing for duration, debounce almost finished but then user typed and debounce didn't catch that and now only 0.05 sec passed and 'stopped typing' event is launched



do you see what i am saying?
//////////////////////////////////////////////////////////////////////////

###first thoughts
- it's just an input
- it just needs some kinda event handler with timeout
- prolly little code needed
- feedback = read from ls
- it's input + some state display
- it has on mount and storage

### questions
- can input be anything, any character? (assume yes)
- so it's input type something, show state, stop typing, show state countdown then show state saved and actually save and onload to just load saved and show that

### data
- so user types and it shows "Typing..."
- user stops typing and it shows "Saving..."
- user types again, back to "Typing..."
- stops again "SAving..."
- after two seconds "Saved"
- you refresh = load saved data and display it

- INPUT = stream of user types / stops typing and page refresh
- OUPUT = stream of state "Typing..." "Saving..." "Saved", LS save-update, on mount saved data loads from ls


### what am i looking for
- decisive advantage point - is circuit start/end mount ls load ---- ls save after
- decisive advantage point - circuit middle - wiring input events to state
- capture input event types properly
- watch out for gotcha's, gotta clean up and account for react lifecycle

### what i know
- input html
- state
- useEffect to load on mount
- localstorage safe / update
- display state
- async event handling
- set timeout
- promises, egg, egg handling etc
- beware stale vars, closure

### how do these two fit together
- bare input html
- wire it with state to display 'TYPING...' when user types
- wire entire possibilities space via state
- trigger event on stopped typing, with timeout
- in timeout f, trigger ls save
- clean up timeout
- on mount, ls load
- IN SHORT: ls load use effect, ls save handler /w timeout promise


### unclarities - MORE QUESTIONS that should be found and asked
- clean up timeout? store to var, clear later
- anything else needs clean up? ls? no, just update; input itself? YES; state? no
- clean up input on save
- user types and stops...0.5 sec until 'Saving...'? whatever, yes


###### PLAN SOLVING PROCESS -> HOW TO SOLVE PLAN /////FEDBACK 11;43 - B A D   PLAN, THAT DIDN'T WORK
- start = lay out things to be put together "on table"
- delete anything unnecessary
- layout each "cable" of the circuit - each connection "on table"
- delete anything unnecessary
- layout each "trigger" "on table"
- put together SEQUENCE
- resolve any lingering doubts / unclarities

###### SOLVING PROCESS -> SOLUTION
- input, user typing, user stop typing detection, timeout, debounce, "Typing...", "Saving...", "Saved", LS save, LS load, page refresh, onchange input handler
- how to detect user stopped typing?
- on key up, detect that -> trigger timeout 0.4 sec
- timeout -> start 'saving' timeout
- if user re-types, reset timeout

- unclear on how debounce fits in - how does it fit in?
- why do I need to debounce? it's too close together to debounce...
- user types in blablabla = 9x timeout clear start new timeout
- examining why do I need debounce - googling + now asking AI but giving my own thoughts and clear articulation of my conundrum about it first
- ok, done (TIME - 11;10) - debounce reset f execution (timeout) on every new keystroke
- that's how debounce fits in: every keystroke = reset timer on timeout
- ///// mental note - FUCK, I'M SO OUT OF TIME....THIS IS SO BEHIND THE POWER CURVE (REFERENCE TO JOCKO WILLINK'S NOTIONS ABOUT TIME...)...AND I TRIED MY FUCKING BEST, THIS IS PERFECT FOR DEBRIEF - IT'S ABOUT PROCESS ISSUE, NOT WILL OR ENERGY INPUT ISSUE - IT'S TECHNICAL - THE APPROACH/PROCESS HAS CRITICAL BUGS/FLAWS THAT ARE VERY HARD TO IDENTIFY AND RESIST AND GENERIC NOTIONS BECAUSE IT IS NOT SOME STUPID "JUST GET ON WITH IT" OR SOME OTHER DUMB CRAP (WHICH IS THE EXACT OPPOSITE OF WHAT I WAS LEARNING YESTERDAY ON GOOD PROBLEM SOLVING FROM GEORGE POLYA BTW)


###### SOLVING PROCESS -> SOLUTION (again for clarity, above is bloated now
- html input, events, event detector on key up, debounced timeout f, timeout f on saving, ls save, page refresh, ls load, clear timeout, clear other timeout, clear input, state
- input, user types -> detect key up -> run trackStoppedTyping = debounced timer -> on trackStoppedTyping, launch saving timeount f -> user typed again, clear saving timeout -> re-run track stopped typing, reset state
///// 1 THIS TAKES SO MUCH TIME ////  2 BUT PERHAPS - SOMETIMES YOU NEED TO DO SOMETHING SLOW, BEFORE YOU CAN DO IT QUICKLY ///// PERHAPS - IT'S LIKE THIS WITH AWARENESS/UNDERSTANDING, TOO - YOU NEED TO SLOWLY BECOME AWARE OF <HOW TO SOLVE X> BEFORE YOU CAN DO THE SAME PROCESS LEADING TO AWARENESS/UNDERSTANDING FAST....
///////// ^IMPORTANT NOTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT!!!!!!!!!!!!!

###### PLAN SOLVING PROCESS -> HOW TO SOLVE PLAN
- 11;45 instead of grouping stuff and laying it out on "table", FIRST ISOLATE INTO SMALLER, RELATED PROBLEMS - THIS IS KEY
12;24 BACK AT IT AFTER EATING; DURING - PLAYED SOME 1 MIN CHESS ALL OUT ATTACK NON-STOP RELENTLESS JUST TOTAL RAGE FOCUS - INTERESTINGLY, MY PATTERN OF PROCESSING MOVES AND PLAY AND RESULTS INSTANTLY SHOT UP AND I GAINED MASSIVE ADVANTAGES IN GAMES SUPER EARLY LIKE I DIDN'T BEFORE MORE OFTEN BUT ALSO, I ALSO BLUNDERED ABSURDLY SOMETIMES - BUT THEN ALL THAT OFFENSIVE SPIRIT TURNED TO ATTACK THAT WEAK SPOT AND FIX THAT AND THEN CRUSH THAT AND SO ON - INTERESTING - ANYWAY, BACK TO DRILL
12;30

###### PLAN SOLVING PROCESS -> HOW TO SOLVE PLAN
- SPLIT INTO SUB-PROBLEMS AND HARDCORE HARD-RESET HARD-ISOLATE (ZERO INTERFERING CONTEXT / PER ISO SOLVING)
- 1 REGISTER STOPPED TYPING WITH DEBOUNCED F, CONSOLE LOG THAT
- 2 SAVING F - LAUNCH AND ON TYPE RESET SAVING F TIMEOUT, CONSOLE LOG THAT IT LAUNCHES/RESETS
- 3 SAVE TO LS ON F END, LOAD FROM LS ON MOUNT
- 4 DISPLAY STATE

###### SOLVING PROCESS -> SOLUTION DESIGN (CODE BLUEPRINT)
- SETUP
-- react comp returns input
- FIRST
- input, registers on key up
- that event handler runs debouncedHasStoppedTyping
- debouncedHasStoppedTyping logs 'restarted' per key stroke, and 'STOPPED TYPING EVENT' on its conclusion

- SECOND
- on STOPPED TYPING EVENT, run SAVING USER INPUT F
- SAVING USER INPUT F HAS SIGNAL CONTROLLER - MEANS TO STOP TIMEOUT MID FLIGHT
- SAVING USER INPUT LAUNCHES console log 'SAVING USER INPUT 2 SECOND COUNTDOWN...'
- type into input, wait, type again -> resets as normal console log
- type into input, wait long, type again -> starts 'saving', console log 'saving user input 2 second countdown', TYPE AGAIN -> console.log 'mid flight stopped saving user input f'

- THIRD
- just save to ls
- useEffect / clean up, load from ls


- 4 DISPLAY STATE
- hook up state instead of console logs, 'Typing...', 'Saving...', 'Saved'

IMPORTANT Q:
- what if it's 'Saved'? can user still type? What happens then?
- makes most sense: input is reset at this point, if they type again, the process works as normal except - instead of direct save to ls - it checks ls and pops out alert 'already saved value exists - want to override it?' yes/no returns to the same place except with new/old value

/////// IS THAT PROPER SOLUTION?
IT FEELS LIKE TOTAL UTTER OVERKILL - BUT AGAIN, IT'S NOT ABOUT THIS ONE PROBLEM - IT'S ABOUT THE PROCESS AND PROBLEM SOLVING MACHINE

////// THAT'S MORE LIKE SOLUTION DRAFT

////// LET'S G O  A G A I N



12;49
///////////////////////


SOLUTION PROCESS -> SOLUTION DESIGN
1. (SOLVED IN ISOLATION)'S CIRCUIT *TRACK* TO RUN:
- DETECTING STOPPED TYPING
- DEBOUNCED RESETTING F
- LAUNCHING SAVING F
- RESETTING SAVING F
- CONCLUDING SAVING F
- SAVE TO LS
- CHECK LS
- JUST SAVE OR RUN ALERT
- ALERT YES/NO SAVE NEW VAL/DO NOTHING
- PAGE REFRESH USE EFFECT ON MOUNT LOAD FROM LS
- EXISTS YES SHOW / NO NOTHING
- SHOW STATE INSTEAD OF CONSOLE.LOGS

12;54 //// 22 MINUTES ////// ON TYPING OUT THE ABOVE

2. RUNNING THE CIRCUIT *TRACK*




///// this was typed hours ago///////
- strip it of all decorative stuff - just pure raw concretes
- first of all, do GRINDE (Justin Sung) mentally -> draw it out as simply as possible
- raw concretes:
-- can user type? does the state display change properly?
-- are timings correct? on typing stopped? on saving?
-- are resets and edge cases and across problem space all correct? no bug to be found?
-- are timeouts cleared properly?
-- is performance ok?
-- is page refresh, start and end state correct?
-- is local storage save/update, load correct?
-- can you break that by some combo of inputs? does it live vs matrix of possibilities?



STARTING TO CODE IT 13;04

NOTES DURING:
- instantly notice that on key up vs on change and controlled input was missed
- first complication point - on key up vs on change controlled input
- typescript type issue Property 'value' does not exist on type 'EventTarget'.ts(2339)
- this is a wall for me; choice - google
- ok, currentTarget.value + react type, fixed
- and i need both on change and on key up
- /// btw i feel the ... it's a disaster, it's 13;16, WHAT THE FUCK!!!!!!!!!!!!!!!!!! i get that this is working on my PROBLEM SOLVING PROCESS BUT .... 13;16? THAT HUGE-FUCK-TON-GARGANTUAN-AMOUNT OF TIME
- ok, relax, calm. let's assess and see prio.
-- background thoughts justification - this is extremely strategic
-- background thoughts justification - and I mean, what the fuck am I supposed to do? if I can't break through something due to unclarity or lacking confirmation etc. - then what the fuck do you expect? magically jump over tens of hoops in one step and just skip it? then I'm back to square zero, repeating the same patterns which already don't fucking work - i have blow outs like this all the time - THIS IS CRITICAL - THIS IS FIXING THE FUCKING WEAKNESS - THE ROOT CAUSE - THE BOTTLENECK - IT'S PUTTING IT ON HIGH RES DISPLAY
// 13;19




*/

import { useState } from "react";

function DebouncedAutoSaveInput() {
  const [text, setText] = useState("");
  const handleHasStoppedTyping = function (e: React.KeyboardEvent<HTMLInputElement>) {
    console.log("has stopped typing f");
  };

  return (
    <div>
      <input type="text" className="border-2 border-black p-2" onChange={(e) => setText(e.currentTarget.value)} onKeyUp={handleHasStoppedTyping} value={text} />
    </div>
  );
}

export default function MorningDrills() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <DebouncedAutoSaveInput />
    </div>
  );
}
