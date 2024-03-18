import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { useState } from 'react';
import { ChromePicker } from 'react-color';

const inputStyles = {
  padding: 0,
  width: '100%',
  borderRadius: '100px',
  border: 'none',
  margin: 0,
  position: 'relative',

  '& > .MuiInputBase-input': {
    background: '#efeff1',
    borderRadius: '100px',
    fontSize: '12px',
    paddingLeft: '28px',
    paddingBottom: '8px',
    paddingTop: '8px',
    margin: 0
  }
};

const inputLabelStyles = {
  color: 'rgb(128,128,128)',
  '&.MuiFormLabel-root': {
    fontSize: '18px',
    borderRadius: '100px',
    paddingLeft: '0px',
    paddingTop: '3px',
    marginBottom: '3px',
    position: 'relative',
    left: '-12px'
  }
};

export type ToolbarTextInputProps = {
  prefix?: string;
  label?: string;
  type: string;
  onChange?: (value: any) => void;
  value?: any;
};

export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let val = value;
    if (type === 'color' || type === 'bg')
      val = `rgba(${Object.values(value)})`;
    setInternalValue(val);
  }, [value, type]);

  return (
    <div
      style={{ width: '100%', position: 'relative' }}
      onClick={() => {
        setActive(true);
      }}
    >
      {(type === 'color' || type === 'bg') && active ? (
        <div
          style={{
            position: 'absolute',
            zIndex: 99999,
            top: 'calc(100% + 10px)',
            left: '-5%'
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
            }}
          ></div>
          <ChromePicker
            color={value}
            onChange={(color: any) => {
              onChange(color.rgb);
            }}
          />
        </div>
      ) : null}
      <TextField
        label={label}
        style={{ margin: 0, width: '100%' }}
        value={internalValue || ''}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange((e.target as any).value);
          }
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        margin="dense"
        variant="filled"
        InputProps={{
          sx: { ...inputStyles },
          disableUnderline: true,
          startAdornment: ['color', 'bg'].includes(type) ? (
            <InputAdornment
              position="start"
              style={{
                position: 'absolute',
                marginTop: '2px',
                marginRight: '8px'
              }}
            >
              <div
                className="app-rounded-full"
                style={{
                  left: '15px',
                  background: internalValue,
                  position: 'relative',
                  display: 'inline-block',
                  width: '0.5rem',
                  height: '0.5rem',
                  cursor: 'pointer'
                }}
              />
            </InputAdornment>
          ) : null
        }}
        InputLabelProps={{
          sx: { ...inputLabelStyles },
          shrink: true
        }}
        {...props}
      />
    </div>
  );
};
