'use client';

import '@css/activity.css';
import { ReactElement, useEffect, useState } from 'react';
import RandomGif from '@component/RandomGif';

interface Props {
    properties: any
}

export default function Activity(params: Props): JSX.Element {
    const [p1, setP1] = useState<number | ReactElement>();
    const [p2, setP2] = useState<number | ReactElement>();
    const [p3, setP3] = useState<number | ReactElement>();
    const [displayGif, setDisplayGif] = useState<boolean>(true);
    const [inProgress, setInProgress] = useState<boolean>(true);
    const [scoreDisplay, setScoreDisplay] = useState<string>('Score: 0');
    const [sumFirst, setSumFirst] = useState<boolean>(false);
    var QUESTIONS_ANSWERED: number = 0;
    var QUESTIONS_CORRECT: number = 0;

    var SETS: [p1: number | ReactElement, p2: number | ReactElement, p3: number | ReactElement, sumFirst: boolean, answer: number][] = [];
    var CURRENTANSWER: number = 0;
    
    const doublesOf: number | number[] = Object.keys(params.properties.doublesOf)[0] == 'specific' ? params.properties.doublesOf.specific : Object.keys(params.properties.doublesOf)[0] == 'range' ? Array.from({ length: params.properties.doublesOf.range.max - params.properties.doublesOf.range.min + 1 }, (v, i) => i + params.properties.doublesOf.range.min) : 0;
    const plusNum: number | number[] = Object.keys(params.properties.plusNum)[0] == 'specific' ? params.properties.plusNum.specific : Object.keys(params.properties.plusNum)[0] == 'range' ? Array.from({ length: params.properties.plusNum.range.max - params.properties.plusNum.range.min + 1 }, (v, i) => i + params.properties.plusNum.range.min) : 0;
    const missingPosition: string[] = params.properties.missingPosition;
    const plusNumPosition: string[] = params.properties.plusNumPosition;
    const equationFormat: string[] = params.properties.equationFormat;
    const numberOfQuestions: {} = params.properties.numberOfQuestions;
    const allowRetries: boolean = params.properties.studentExperience.includes('allowRetries');
    const displayScore: boolean = params.properties.studentExperience.includes('displayScore');
    const gifOnCorrect: boolean = params.properties.studentExperience.includes('gifOnCorrect');
    const completionMessage: string = params.properties.completionMessage;
    
    const MAX_DIGITS = doublesOf.toString().length + 1;
    const ANSWER_REGEX = '^(?:0*)(?=0)?0?([0-9]{1,' + MAX_DIGITS + '})';
    var INPUT_ENABLED = true;

    function generateSets() {
        const input = <input type='number' id='answer' placeholder='?' />;

        var bitsToAdd = [];
        if(typeof doublesOf === 'number') {
            bitsToAdd.push(doublesOf);
        } else {
            bitsToAdd = doublesOf;
        }

        bitsToAdd.forEach((double) => {
            if(equationFormat.includes('sumLast')) {
                if(missingPosition.includes('double1')) {
                    if(plusNumPosition.includes('double1'))
                        SETS.push([input, double, double + double + plusNum, false, double + plusNum]);
                    if(plusNumPosition.includes('double2'))
                        SETS.push([input, double + plusNum, double + double + plusNum, false, double]);
                }
                if(missingPosition.includes('double2')) {
                    if(plusNumPosition.includes('double1'))
                        SETS.push([double + plusNum, input, double + double + plusNum, false, double]);
                    if(plusNumPosition.includes('double2'))
                        SETS.push([double, input, double + double + plusNum, false, double + plusNum]);
                }
                if(missingPosition.includes('sum')) {
                    if(plusNumPosition.includes('double1'))
                        SETS.push([double + plusNum, double, input, false, double + double + plusNum]);
                    if(plusNumPosition.includes('double2'))
                        SETS.push([double, double + plusNum, input, false, double + double + plusNum]);
                }
            }
            if(equationFormat.includes('sumFirst')) {
                if(missingPosition.includes('double1')) {
                    if(plusNumPosition.includes('double1'))
                        SETS.push([double + double + plusNum, input, double, true, double + plusNum]);
                    if(plusNumPosition.includes('double2'))
                        SETS.push([double + double + plusNum, input, double + plusNum, true, double]);
                }
                if(missingPosition.includes('double2')) {
                    if(plusNumPosition.includes('double1'))
                        SETS.push([double + double + plusNum, double + plusNum, input, true, double]);
                    if(plusNumPosition.includes('double2'))
                        SETS.push([double + double + plusNum, double, input, true, double + plusNum]);
                }
                if(missingPosition.includes('sum')) {
                    if(plusNumPosition.includes('double1'))
                        SETS.push([input, double + plusNum, double, true, double + double + plusNum]);
                    if(plusNumPosition.includes('double2'))
                        SETS.push([input, double, double + plusNum, true, double + double + plusNum]);
                }
            }
        });
    }

    function newProblem() {
        if(Object.keys(numberOfQuestions)[0] == 'exactly' && QUESTIONS_ANSWERED == numberOfQuestions['exactly']) {
            end();
            return;
        } else if(Object.keys(numberOfQuestions)[0] == 'untilScore' && QUESTIONS_CORRECT == numberOfQuestions['untilScore']) {
            end();
            return;
        }

        if(SETS.length == 0) {
            generateSets();
        }

        var question = SETS.splice(Math.floor(Math.random() * SETS.length), 1)[0];
        setP1(question[0]);
        setP2(question[1]);
        setP3(question[2]);
        setSumFirst(question[3]);
        CURRENTANSWER = question[4];
    }

    function end() {
        setInProgress(false);
    }

    function validateNumberFormat(value: string) {
        var reg = value.match(ANSWER_REGEX);
        if(reg == null) {
            return '';
        }
        return reg[1];
    }

    function checkAnswer() {
        var box = document.getElementById('answer') as HTMLInputElement;
        var gif = document.getElementById('gif') as HTMLInputElement;
        if(box === null || box.value === '') {
            INPUT_ENABLED = true;
            return;
        }
        if(parseInt(box.value) === CURRENTANSWER) {
            QUESTIONS_ANSWERED++;
            QUESTIONS_CORRECT++;
            box.classList.add('correct-answer');
            gif.classList.add('show');
            if(gifOnCorrect)
            setTimeout(() => {
                box.value = '';
                setDisplayGif(false);
                gif.classList.remove('show');
                box.classList.remove('correct-answer');
                newProblem();
                setTimeout(() => {
                    setDisplayGif(true);
                }, 100);
                INPUT_ENABLED = true;
            }, 1500);
        } else {
            QUESTIONS_ANSWERED++;
            box.classList.add('wrong-answer');
            setTimeout(() => {
                box.value = '';
                box.classList.remove('wrong-answer');
                if(!allowRetries) {
                    newProblem();
                }
                INPUT_ENABLED = true;
            }, 600);
        }
        if(allowRetries) {
            setScoreDisplay(`Score: ${QUESTIONS_CORRECT} (${QUESTIONS_ANSWERED} attempts)`);
        } else {
            setScoreDisplay(`Score: ${QUESTIONS_CORRECT}/${QUESTIONS_ANSWERED}`);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', function(event) {
            event.preventDefault();
            if(INPUT_ENABLED) {
                if (event.code == 'Enter' || event.code == 'NumpadEnter') {
                    INPUT_ENABLED = false;
                    checkAnswer();
                } else if(event.code.substring(0, 5) == 'Digit' && !event.altKey && !event.shiftKey) {
                    var num = event.code.substring(5, 6)
                    var answer = document.getElementById('answer') as HTMLInputElement;
                    answer.value = validateNumberFormat(answer.value + '' + num)
                } else if(event.code.substring(0, 6) == 'Numpad' && !event.altKey && !event.shiftKey) {
                    var num = event.code.substring(6, 7)
                    var answer = document.getElementById('answer') as HTMLInputElement;
                    answer.value = validateNumberFormat(answer.value + '' + num)
                } else if(event.code == 'Backspace' || event.code == 'NumpadDelete') {
                    var answer = document.getElementById('answer') as HTMLInputElement;
                    answer.value = validateNumberFormat(answer.value.toString().substring(0, answer.value.toString().length - 1))
                }
            }
        });
        generateSets();
        newProblem();
        // eslint-disable-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h4 id='score'>{displayScore || !inProgress ? scoreDisplay : ''}</h4>
            <div id="content">
                {inProgress ? <ol id="equation">
                    <li><h1>{p1}</h1></li>
                    <li><h1>{sumFirst ? '=' : '+'}</h1></li>
                    <li><h1>{p2}</h1></li>
                    <li><h1>{sumFirst ? '+' : '='}</h1></li>
                    <li><h1>{p3}</h1></li>
                </ol> : null}
                {!inProgress ? <>
                    <h3>{completionMessage}</h3>
                    <RandomGif />
                </> : null}
                {displayGif ? <RandomGif /> : null}
            </div>
        </>
    )
}
