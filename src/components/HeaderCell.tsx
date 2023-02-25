import { Box, Input } from '@chakra-ui/react';
import React, { useCallback } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const HeaderCell = React.forwardRef<HTMLInputElement, Props>(({ value, onChange, onKeyDown, disabled = false }, ref) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      onChange(ev.target.value);
    },
    [onChange],
  );

  return (
    <Box onKeyDown={onKeyDown}>
        <Input
          disabled={disabled}
          onChange={onChangeHandler}
          value={value}
          borderRadius={0}
          onKeyDown={onKeyDown}
          ref={ref}
        />
    </Box>
  );
});

export default HeaderCell;