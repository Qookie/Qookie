import { RefObject, useEffect } from 'react';

export default function mouseSwipe(dragRef: RefObject<HTMLElement>) {
  let isClicked = false;
  let startX: number;
  let startScrollLeft: number;

  const mouseTouchDown = (e: MouseEvent | TouchEvent) => {
    // 마우스를 눌렀을 때
    const ref = dragRef.current;
    if (ref) {
      isClicked = true;
      if (e.type === 'mousedown' && 'pageX' in e) {
        startX = e.pageX - ref.offsetLeft;
      } else if (e.type === 'touchstart' && 'touches' in e) {
        startX = e.touches[0].pageX - ref.offsetLeft;
      }
      startScrollLeft = ref.scrollLeft;
    }
  };
  
  const mouseTouchLeave = (e: MouseEvent | TouchEvent) => {
    isClicked = false;
  };

  const mouseTouchUp = (e: MouseEvent | TouchEvent) => {
    isClicked = false;
  };

  const mouseTouchMove = (e: MouseEvent | TouchEvent) => {
    const ref = dragRef.current;

    if (!isClicked) return;
    if (e.cancelable) e.preventDefault();

    if (ref) {
      if (e.type === 'mousemove' && 'pageX' in e) {
        const currentX = e.pageX - ref.offsetLeft;
        const walk = currentX - startX;
        ref.scrollLeft = startScrollLeft - walk;
      } else if (e.type === 'touchmove' && 'touches' in e) {
        const currentX = e.touches[0].pageX - ref.offsetLeft;
        const walk = currentX - startX;
        ref.scrollLeft = startScrollLeft - walk;
      }
    }
  };

  useEffect(() => {
    const ref = dragRef.current;
    if (ref) {
      // 마운트 시에 이벤트를 등록
      ref.addEventListener('mousedown', mouseTouchDown);
      ref.addEventListener('mouseleave', mouseTouchLeave);
      ref.addEventListener('mouseup', mouseTouchUp);
      ref.addEventListener('mousemove', mouseTouchMove);
      ref.addEventListener('touchstart', mouseTouchDown);
      ref.addEventListener('touchcancel', mouseTouchLeave);
      ref.addEventListener('touchend', mouseTouchUp);
      ref.addEventListener('touchmove', mouseTouchMove);
    }

    return () => {
      if (ref) {
        // 언마운트 시에 이벤트 삭제
        ref.removeEventListener('mousedown', mouseTouchDown);
        ref.removeEventListener('mouseleave', mouseTouchLeave);
        ref.removeEventListener('mouseup', mouseTouchUp);
        ref.removeEventListener('mousemove', mouseTouchMove);
        ref.removeEventListener('touchstart', mouseTouchDown);
        ref.removeEventListener('touchcancel', mouseTouchLeave);
        ref.removeEventListener('touchend', mouseTouchUp);
        ref.removeEventListener('touchmove', mouseTouchMove);
      }
    };
  }, [dragRef]);
}
