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
    
    const sum: number = params.properties.sum;
    const missingPosition: string[] = params.properties.missingPosition;
    const equationFormat: string[] = params.properties.equationFormat;
    const numberOfQuestions: {} = params.properties.numberOfQuestions;
    const allowRetries: boolean = params.properties.studentExperience.includes('allowRetries');
    const displayScore: boolean = params.properties.studentExperience.includes('displayScore');
    const gifOnCorrect: boolean = params.properties.studentExperience.includes('gifOnCorrect');
    const completionMessage: string = params.properties.completionMessage;
    
    const MAX_DIGITS = sum.toString().length;
    const ANSWER_REGEX = '^(?:0*)(?=0)?0?([0-9]{1,' + MAX_DIGITS + '})';

    function generateSets() {
        const input = <input type='number' id='answer' placeholder='?' />;

        for(var i = 0; i <= sum; i++) {
            if(equationFormat.includes('sumLast')) {
                if(missingPosition.includes('addend1')) {
                    SETS.push([input, sum - i, sum, false, i]);
                }
                if(missingPosition.includes('addend2')) {
                    SETS.push([i, input, sum, false, sum - i]);
                }
                if(missingPosition.includes('sum')) {
                    SETS.push([i, sum - i, input, false, sum]);
                }
            }
            if(equationFormat.includes('sumFirst')) {
                if(missingPosition.includes('addend1')) {
                    SETS.push([sum, input, sum - i, true, i]);
                }
                if(missingPosition.includes('addend2')) {
                    SETS.push([sum, i, input, true, sum - i]);
                }
                if(missingPosition.includes('sum')) {
                    SETS.push([input, i, sum - i, true, sum]);
                }
            }
        }
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
        if(box === null) {
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
            console.log(event.code)
            if (event.code == 'Enter' || event.code == 'NumpadEnter') {
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