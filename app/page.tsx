.root {
  display: flex;
  padding: 40px 100px;
  flex-direction: column;
  gap: 20px;
  max-width: 650px;
  justify-content: center;
  margin: auto;

  @media screen and (max-width: 500px) {
    padding: 20px 60px;
  }

  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      color: #353535;
    }
    svg {
      width: 20px;
    }
  }

  .redirection-button-container {
    border: 1px solid #dee2e6;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #efe9ae;
    //background-color: #ffcb77b3;

    transition: border-color 1s, background-color 1s;

    &:hover {
      border-color: #adb5bd;
      background-color: #ffcb77b3;
    }
    .create-list-button {
      border: none;
      cursor: pointer;
      background-color: inherit;

      svg {
        max-width: 20px;
        max-height: 20px;
        width: 100%;
        height: 100%;
      }
    }
  }
}
