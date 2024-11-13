import { FC, HTMLAttributes } from 'react'

const SvgIcon: FC<HTMLAttributes<HTMLImageElement> & { iconName: string }> = ({
  iconName,
  ...props
}) => <img src={`/assets/icons/${iconName}.svg`} {...props} />

export default SvgIcon
