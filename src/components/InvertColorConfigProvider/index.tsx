import { FC } from 'react'
import { ConfigProvider, ConfigProviderProps, theme } from 'antd'

const InvertColorConfigProvider: FC<ConfigProviderProps> = props => {
  const { token } = theme.useToken()

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'transparent',
          colorBgElevated: '#000',
          controlItemBgActive: token.colorPrimary,
          controlItemBgHover: '#89888b',
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