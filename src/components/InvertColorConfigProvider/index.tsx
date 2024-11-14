import { FC } from 'react'
import { ConfigProvider, ConfigProviderProps, theme } from 'antd'

const InvertColorConfigProvider: FC<ConfigProviderProps> = props => {
  const { token } = theme.useToken()

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'transparent',
          colorBgElevated: '#242326',
          controlItemBgActive: token.colorPrimary,
          controlItemBgHover: '#4a494c',
          colorTextPlaceholder: '#89888b',
          colorTextQuaternary: '#D6D6D6', // Arrow color
          colorFillTertiary: '#da458f3d', // Button text hover color
        },
      }}
      {...props}
    />
  )
}

export default InvertColorConfigProvider
