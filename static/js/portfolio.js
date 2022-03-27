(() => {
    let yOffset=0;
    let prevScrollHeight=0;
    let currentScene=0;
    let enterNewScene=false;
    let acc = 0.2;
	let delayedYOffset = 0;
	let rafId;
	let rafState;

    let headline = document.getElementsByClassName('content-section_headline-container');
    let headlineOffset = headline[0].offsetTop;
    let letters = headline[0].innerText.split('');
    letters = letters.filter(function(letter) {
      return letter !== ' ' && letter !== '\n' ? letter : false;
    });
    let tweenDistance = getRandomArbitrary(200, 400);
    let topDistance = 0;
    let movement = 0;
    let elements = [];

    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function move(element, distance) {
      let translate3d = 'translate3d(0, ' + distance + 'px, 0)';
      element.style['-webkit-transform'] = translate3d;
      element.style['-moz-transform'] = translate3d;
      element.style['-ms-transform'] = translate3d;
      element.style['-o-transform'] = translate3d;
      element.style.transform = translate3d;
    };

    function moveY(element, distance) {
      let translate3d = 'translateY(' + distance + '%)';
      element.style['-webkit-transform'] = translate3d;
      element.style['-moz-transform'] = translate3d;
      element.style['-ms-transform'] = translate3d;
      element.style['-o-transform'] = translate3d;
      element.style.transform = translate3d;
    };

    function tweenHeight(element, scrollDistance, tweenDistance, initialHeight) {
      element.style.height = (((tweenDistance - scrollDistance) / tweenDistance) * initialHeight) + 'px';
    }

    letters.forEach(function(letter) {
      let element = document.createElement('span');
      element.innerText = letter;
      element.dataset.speed = Math.random(0, 1).toFixed(2);
      headline[0].appendChild(element);
      elements.push(element);
    });


    const sceneInfo=[
        {
          type: 'sticky',
          heightNum: 3,
          scrollHeight: 0,
          objs: {
              container: document.querySelector('#scroll-section-0'),
              messageA: document.querySelector('#scroll-section-0 .big-message.a'),
              messageActive: document.querySelector('#scroll-section-0 .big-message.a span'),
              canvas: document.querySelector('#video-canvas-0'),
              context: document.querySelector('#video-canvas-0').getContext('2d'),
          },
			values: {
				messageA_translateX_in: [150, 0, { start: 0.1, end: 0.4 }],
				messageA_translateX_out: [0, 0, { start: 0.4, end: 1 }],
			}
        },
        {
          type: 'sticky',
          heightNum: 5,
          scrollHeight: 0,
          objs: {
              container: document.querySelector('#scroll-section-1'),
              messageA: document.querySelector('#scroll-section-1 .main-message.a'),
              messageB: document.querySelector('#scroll-section-1 .main-message.b'),
              messageC: document.querySelector('#scroll-section-1 .main-message.c'),
              messageD: document.querySelector('#scroll-section-1 .main-message.d'),
              messageE: document.querySelector('#scroll-section-1 .main-message.e'),
              canvas: document.querySelector('#video-canvas-1'),
              context: document.querySelector('#video-canvas-1').getContext('2d'),
          },
			values: {
                canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
                messageA_opacity_in: [0, 1, { start: 0.01, end: 0.04 }],
                messageB_opacity_in: [0, 1, { start: 0.12, end: 0.17 }],
                messageC_opacity_in: [0, 1, { start: 0.28, end: 0.37 }],
                messageD_opacity_in: [0, 1, { start: 0.48, end: 0.57 }],
                messageE_opacity_in: [0, 1, { start: 0.75, end: 0.78 }],
                messageA_translateY_in: [20, 0, { start: 0.02, end: 0.04 }],
                messageB_translateY_in: [20, 0, { start: 0.12, end: 0.17 }],
                messageC_translateY_in: [20, 0, { start: 0.28, end: 0.37 }],
                messageD_translateY_in: [20, 0, { start: 0.48, end: 0.57 }],
                messageE_translateY_in: [20, 0, { start: 0.75, end: 0.78 }],
                messageA_opacity_out: [1, 0, { start: 0.115, end: 0.15 }],
                messageB_opacity_out: [1, 0, { start: 0.24, end: 0.27 }],
                messageC_opacity_out: [1, 0, { start: 0.48, end: 0.55 }],
                messageD_opacity_out: [1, 0, { start: 0.68, end: 0.75 }],
                messageE_opacity_out: [1, 0, { start: 0.88, end: 0.95 }],
                messageA_translateY_out: [0, -20, { start: 0.115, end: 0.15 }],
                messageB_translateY_out: [0, -20, { start: 0.24, end: 0.27 }],
                messageC_translateY_out: [0, -20, { start: 0.48, end: 0.55 }],
                messageD_translateY_out: [0, -20, { start: 0.68, end: 0.75 }],
                messageE_translateY_out: [0, -20, { start: 0.88, end: 0.95 }],
			}
        },
        {
          type: 'sticky',
          heightNum: 4.2,
          scrollHeight: 0,
          objs: {
              container: document.querySelector('#scroll-section-2'),
              messageA: document.querySelector('#scroll-section-2 .big-message.a'),
              messageActive: document.querySelector('#scroll-section-2 .big-message.a span'),
              canvas: document.querySelector('#video-canvas-2'),
              context: document.querySelector('#video-canvas-2').getContext('2d'),
          },
			values: {
               canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
				messageA_translateX_in: [180, 25, { start: 0, end: 0.2 }],
				messageA_translateX_out: [0, 0, { start: 0.25, end: 35 }],
			}
        },
        {
          type: 'sticky',
          heightNum: 3,
          scrollHeight: 0,
          objs: {
              container: document.querySelector('#scroll-section-3'),
              messageA: document.querySelector('#scroll-section-3 .main-message.a'),
              messageB: document.querySelector('#scroll-section-3 .main-message.b'),
              canvas: document.querySelector('#video-canvas-3'),
              context: document.querySelector('#video-canvas-3').getContext('2d'),
          },
			values: {
                messageA_opacity_in: [0, 1, { start: 0.01, end: 0.07 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageA_translateY_in: [20, 0, { start: 0.02, end: 0.04 }],
                messageB_translateY_in: [20, 0, { start: 0.12, end: 0.17 }],
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.37 }],
                messageA_translateY_out: [0, -20, { start: 0.115, end: 0.15 }],
                messageB_translateY_out: [0, -20, { start: 0.24, end: 0.27 }],
			}
        },
    ];

    function setLayout(){
        for( let i=0; i<sceneInfo.length; i++ ) {
            if( sceneInfo[i].type === 'sticky' ) {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if ( sceneInfo[i].type === 'normal' ) {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.content.offsetHeight+window.innerHeight * 0.5;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for( let i=0; i<sceneInfo.length; i++ ) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset ) {
                currentScene=i;
                break;
            }
        }

        document.body.setAttribute('id',`show-scene-${currentScene}`);

        const heightRatio = window.innerHeight/1080;
		sceneInfo[1].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function calcValues( values, currentYOffset ) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset/scrollHeight;

        if( values.length === 3 ) {
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd-partScrollStart;

            if( currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd ) {
                rv = (currentYOffset-partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if ( currentYOffset < partScrollStart ) {
                rv = values[0];
            } else if ( currentYOffset > partScrollEnd ) {
                rv = values[1];
            }
        } else {
            rv = scrollRatio*(values[1]-values[0]) + values[0];
        }
        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset-prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset/scrollHeight;

        switch( currentScene ) {
            case 0:
                if( scrollRatio > 0) {
                    objs.messageA.style.display='block';
                    objs.messageA.classList.add('active');
                    objs.messageA.style.transform = `translate3d(${calcValues(values.messageA_translateX_in,currentYOffset )}%,-50%, 0`;
                }

                if( scrollRatio >= 0.65 ) {
                    objs.messageActive.classList.add('active');
                } else {
                    objs.messageActive.classList.remove('active');
                }

                if( scrollRatio > 0.75 ) {
                    objs.messageA.classList.remove('active');
                    objs.messageA.style.transform = `translate3d(-1.3%,${scrollHeight-(scrollHeight*0.33) }px, 0`;
                } else {
                    objs.messageA.classList.add('active');
                }
                break;

            case 1:
                objs.canvas.style.opacity = calcValues( values.canvas_opacity, currentYOffset);

				if (scrollRatio <= 0.04) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.18) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.38) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.58) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.78) {
					// in
					objs.messageE.style.opacity = calcValues(values.messageE_opacity_in, currentYOffset);
					objs.messageE.style.transform = `translate3d(0, ${calcValues(values.messageE_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageE.style.opacity = calcValues(values.messageE_opacity_out, currentYOffset);
					objs.messageE.style.transform = `translate3d(0, ${calcValues(values.messageE_translateY_out, currentYOffset)}%, 0)`;
				}

				break;


            case 2:
                if( scrollRatio > 0) {
                    objs.messageA.style.display='block';
                    objs.messageA.classList.add('active');
                    objs.messageA.style.transform = `translate3d(${calcValues(values.messageA_translateX_in,currentYOffset )}%,-50%, 0`;
                }

                if( scrollRatio >= 0.2 ) {
                    objs.messageActive.classList.add('active');
                } else {
                    objs.messageActive.classList.remove('active');
                }

                if( scrollRatio > 0.27 ) {
                    objs.messageA.classList.remove('active');
                    objs.messageA.style.transform = `translate3d(16%,${scrollHeight-(scrollHeight*0.765) }px, 0`;
                } else {
                    objs.messageA.classList.add('active');
                }
                break;


            case 3:
				if (scrollRatio <= 0.1) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
				}

				if (scrollRatio <= 0.4) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    document.querySelector(".scroll-indicator").style.display="block";
				} else {
                    document.querySelector(".scroll-indicator").style.display="none";
                }

				break;
        }
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (delayedYOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            document.body.classList.remove('scroll-effect-end');
        }

        if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            if (currentScene === sceneInfo.length - 1) {
                document.body.classList.add('scroll-effect-end');
            }
            if (currentScene < sceneInfo.length - 1) {
                currentScene++;
            }

            document.body.setAttribute('id', `show-scene-${currentScene}`);
            document.body.classList.remove('scroll-effect-end');
        }

        if (delayedYOffset < prevScrollHeight) {
            enterNewScene = true;
            // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
            document.body.classList.add('scroll-effect-end');
        }

        if (enterNewScene) return;

        playAnimation();
    }


    function loop() {
		delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;


        // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
        // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
        if (delayedYOffset < 1) {
            scrollLoop();
            sceneInfo[1].objs.canvas.style.opacity = 1;
        }
        // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
        if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
            let tempYOffset = yOffset;
            scrollTo(0, tempYOffset - 1);
        }

		rafId = requestAnimationFrame(loop);

		if (Math.abs(yOffset - delayedYOffset) < 1) {
			cancelAnimationFrame(rafId);
			rafState = false;
		}
	}



    window.addEventListener('load', () => {
            setLayout();
            document.body.classList.remove('before-load');
            setLayout();

		// 중간에서 새로고침 했을 경우 자동 스크롤로 제대로 그려주기
        let tempYOffset = yOffset;
        let tempScrollCount = 0;
        if (tempYOffset > 0) {
            let siId = setInterval(() => {
                scrollTo(0, tempYOffset);
                tempYOffset += 5;

                if (tempScrollCount > 20) {
                    clearInterval(siId);
                }
                tempScrollCount++;
            }, 20);
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                window.location.reload();
            }
        });

        window.addEventListener('orientationchange', () => {
            scrollTo(0, 0);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
            window.addEventListener('scroll', ()=>{
                yOffset=window.pageYOffset;
                scrollLoop();

                if (!rafState) {
                    rafId = requestAnimationFrame(loop);
                    rafState = true;
                }

                //첫 번째 페이지 스크롤 이펙트
                movement = topDistance*2;

                elements.forEach(function(element) {
                    movement = -(yOffset * element.dataset.speed);
                    move(element, movement);
                  });
            });

            //로딩중
        document.querySelector('.loading').addEventListener('transitionend', (e) => {
            document.body.removeChild(e.currentTarget);
        });
    });
})();