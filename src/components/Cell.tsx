import { Box, Input } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import formatAsCurrency from 'util/formatAsCurrency';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}
function isNumber(value: string) {
  return !isNaN(Number(value)) && Boolean(value);
}
const parse = (val) => val?.replace(/^\$,./, "");

const Cell = React.forwardRef<HTMLInputElement, Props>(({ value, onChange, onKeyDown }, ref) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      onChange(ev.target.value);
    },
    [onChange],
  );
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(() => {
    if (isNumber(parse(value))) {
      onChange(formatAsCurrency(parse(value)));
    }
  }, [onChange]);

  return (
    <Box onKeyDown={onKeyDown}>
        <Input
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={value}
          type={isNumber(value) ? 'number' : 'text'}
          borderRadius={0}
          onKeyDown={onKeyDown}
          ref={ref}
        />
    </Box>
  );
});

export default Cell;
