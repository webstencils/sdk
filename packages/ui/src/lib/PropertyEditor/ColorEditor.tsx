import { ChromePicker } from 'react-color';
import { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

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

export type ColorEditorProps = {
  label?: string;
  value?: any;
  onChange: (value: any) => void;
};

export const ColorEditor = ({
  onChange,
  value,
  label,
  ...props
}: ColorEditorProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const val = value ? `rgba(${Object.values(value)})` : '';
    setInternalValue(val);
  }, [value]);

  return (
    <div
      style={{ width: '100%', position: 'relative' }}
      onClick={() => {
        setActive(true);
      }}
    >
      {active ? (
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
            onChange={(color) => {
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
            onChange((e.target as HTMLInputElement).value);
          }
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        onBlur={(e) => {
          //   if (type === 'text') {
          //     onChange(e.target.value);
          //   }
        }}
        margin="dense"
        variant="filled"
        InputProps={{
          sx: { ...inputStyles },
          disableUnderline: true,
          startAdornment: (
            <InputAdornment
              position="start"
              style={{
                position: 'absolute',
                marginTop: '2px',
                marginRight: '8px'
              }}
            >
              <div
                style={{
                  borderRadius: '9999px',
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
          )
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
