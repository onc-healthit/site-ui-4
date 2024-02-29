import palette from '@/styles/palette'

const bulletedList = (style: string) => {
  const styledBullet = {
    listStyleType: style,
    ml: 4,
    [`& li.MuiListItem-root::marker`]: {
      width: '1em',
      fontSize: '14px',
      color: palette.primary,
    },
  }
  return styledBullet
}

export default bulletedList
