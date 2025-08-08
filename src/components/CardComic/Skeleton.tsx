import { Image as ImagePlaceholder } from 'lucide-react'
import React from 'react'
import styled from 'styled-components'

export const Skeleton = () => {
  return (
    <Card>
        <ImagePlaceholder size={32} />
        <Content>
            <div></div>
            <div></div>
        </Content>
    </Card>
  )
}

const Card = styled.div`
    max-width: 165px;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #E5E5E5;
    height: 246px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    border: 1px #0F0F0F solid;
    svg {
        margin: auto;
    }
`

const Content = styled.section`
    padding: 8px 6px;
    margin-top: auto;
    background-color: #0C0C0C90;
    color: #FFFFFF;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 16px;
    overflow: hidden;
    display: flex;
    gap: 4px;
    flex-direction: column;
    animation: pulse 3s infinite ease-in-out backwards;
    div {
      height: 0.625em;
      border-radius: 4px;
      background-image: linear-gradient(to right, #E5E5E5, #C7C7C7);
      width: 100%;
    }
    @keyframes pulse {
      0% {
        opacity: 75%;
      }
      50% {
        opacity: 100%;
      }
      100% {
        opacity: 75%;
      }
    }
`