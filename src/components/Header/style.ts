import styled from 'styled-components';

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.gray0};
  .flexGrid {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    .logo {
      max-width: 160px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 20px;

      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        position: relative;
        height: 50px;

        span{
          border: 1px solid ${({ theme }) => theme.colors.primary};
          border-radius: 7px;
          background-color: ${({ theme }) => theme.colors.primary};
          display: flex;
          position: absolute;
          color: ${({ theme }) => theme.colors.white};
          left: 15px;
          top: 0px;
          font-size: 17px;
          padding-top: 0px;
          padding-left: 5px;
          width: 20px;
          height: 20px;
        }

        button {
          background: transparent;
          color: ${({ theme }) => theme.colors.gray150};
          transition: 0.3s;

          :hover {
            color: ${({ theme }) => theme.colors.gray300};
          }
        }
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }

    @media (max-width: 450px) {
      .nav {
        flex-direction: column;
      }
    }
  }
`;
