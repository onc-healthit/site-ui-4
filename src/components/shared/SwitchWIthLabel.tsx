import { FormControlLabel, styled, Switch } from '@mui/material'

const StyledFormControlLabelWithLabelOnRight = styled(FormControlLabel)`
  display: flex;
  flex-direction: row;
`
const StyledFormControlLabelWithLabelOnLeft = styled(FormControlLabel)`
  display: flex;
  flex-direction: row-reverse;
`

interface SwitchWithLabelProps {
  isChecked: boolean
  handleToggleSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void
  labelText: string
  labelOnRight?: boolean
}

export default function SwitchWithLabel({
  isChecked,
  handleToggleSwitch: handleChangeSwitch,
  labelText,
  labelOnRight,
}: SwitchWithLabelProps) {
  const SwitchControl = <Switch checked={isChecked} onChange={handleChangeSwitch} color="secondary" size="small" />

  return labelOnRight ? (
    <StyledFormControlLabelWithLabelOnRight control={SwitchControl} label={labelText} />
  ) : (
    <StyledFormControlLabelWithLabelOnLeft control={SwitchControl} label={labelText} />
  )
}
