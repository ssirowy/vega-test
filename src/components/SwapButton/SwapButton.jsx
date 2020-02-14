import React from 'react'
import styled from 'styled-components'

import swap from './images/swap.png'

const ImgButton = styled.button`
  border: none;
  cursor:pointer;
`

const Img = styled.img`
  height: 20px;
  width: 20px;
`

export const SwapButton = (props) => (<ImgButton {...props}><Img src={swap} /></ImgButton>)