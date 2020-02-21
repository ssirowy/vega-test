import React from 'react'
import styled from 'styled-components'

import add from './images/add.png'

const ImgButton = styled.button`
  border: none;
  cursor:pointer;
  padding: 0;
`

const Img = styled.img`
  background-color: transparent;
  height: 30px;
  width: 30px;
`

export const AddButton = (props) => (<ImgButton {...props}><Img src={add} /></ImgButton>)