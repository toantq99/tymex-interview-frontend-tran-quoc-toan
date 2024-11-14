import { FC, HTMLAttributes } from 'react'

const SvgIcon: FC<HTMLAttributes<HTMLImageElement> & { iconName: string }> = ({
  iconName,
  ...props
}) => <img src={`/assets/icons/${iconName}.svg`} alt={iconName} {...props} />

export default SvgIcon
