import React from 'react'
import DesktopContainer from '../containers/DesktopContainer'
import MobileContainer from "../containers/MobileContainer";

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

export default ResponsiveContainer