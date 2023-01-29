import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateCardProps {
  children: ReactNode;
  direction: number;
}

const variantsAnimateBox = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const transition = {
  x: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  opacity: {
    duration: 0.2,
  },
};

/*
* This Box have to be used inside the element to be animated and as first parent.
* Direction have to be:
*   1 if you want to slide to the right.
*   -1 if you want to slide to left.

* The state of the component that manages the direction and the counter of the page
* have to be an array of 2 numbers [0, 0].
* The first number is the page you want to change, the second number is the direction.
* Example: const [[counterView, direction], setCounterView] = useState([0, 0]);

* You may create a function called paginate, where you add the number to counter of the view,
* and assigns the new direction. Example:
* const paginate = (newDirection: number) => {
    setCounterView([counterView + newDirection, newDirection]);
  };

* For the "GoBack" fn, use paginate(-1) to slide to left.
* For the "GoNext" fn, use paginate(1) to slide to right.
*/

const AnimateBox = ({ children, direction }: AnimateCardProps) => (
  <AnimatePresence custom={direction}>
    <motion.div
      custom={direction}
      variants={variantsAnimateBox}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
    >
      { children }
    </motion.div>
  </AnimatePresence>
);

export { AnimateBox };
