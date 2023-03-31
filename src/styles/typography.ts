import styled, { css } from 'styled-components';
import BaseTitle from './components/BaseTitle';

interface IStyledTitleProps {
  $fontSize: 'one' | 'two' | 'three' | 'four';
  textAlign?: 'center' | 'left' | 'right';
}

interface IStyledParagraphProps {
  fontColor?: 'gray' | 'red';
  textAlign?: 'center' | 'left' | 'right';
}

export const StyledTitle = styled(BaseTitle)<IStyledTitleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;


  .contador{
    width: 100px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    background-color:#E0E0E0;

    span{
      width: 60px;
      height:23px;
      font-size: 15px;
      display: flex;
      justify-content: center;
      background-color: white;
    }

    button{
      width: 50px;
      height: 30px;
      color: #E60000;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  font-family: ${({ theme }) => theme.fonts.primary};
  line-height: 1.6;

  text-align: ${({ textAlign }) => textAlign};

  ${({ $fontSize }) => {
    switch ($fontSize) {
      case 'one':
        return css`
          font-size: 1.55rem;
          font-weight: 700;
        `;
      case 'two':
        return css`
          font-size: 1.35rem;
          font-weight: 700;
        `;

      case 'three':
        return css`
          font-size: 1.15rem;
          font-weight: 700;
        `;

      case 'four':
        return css`
          font-size: 1rem;
          font-weight: 400;
        `;
    }
  }}
`;

export const StyledParagraph = styled.p<IStyledParagraphProps>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.8;
  

  text-align: ${({ textAlign }) => textAlign};
  

  ${({ fontColor, theme }) => {
    switch (fontColor) {
      case 'gray':
        return css`
          color: ${theme.colors.gray300};
        `;
      case 'red':
        return css`
          color: ${theme.colors.feedback.negative};
        `;
      default:
        return css`
          color: ${theme.colors.gray600};
        `;
    }
  }}

  strong {
    font-weight: 600;
    color:${({ theme }) => theme.colors.feedback.negative};
  }
`;

export const StyledCaption = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.75rem;
  font-weight: 400;
`;
