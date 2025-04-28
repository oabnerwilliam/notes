declare module '../../../util/events/clickout/clickOut' {
  const clickOut: (
    ref: React.RefObject<HTMLElement>,
    callback: () => void
  ) => () => void;
  export default clickOut;
}