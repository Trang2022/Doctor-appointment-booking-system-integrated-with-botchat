import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";

import { ThemeProvider } from "styled-components";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      // age: "",
      reason: "",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h3>Tóm tắt</h3>
        <table>
          <tbody>
            <tr>
              <td>Tên</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Giới tính</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Tuổi</td>
              <td>{age.value}</td>
            </tr>
            {/* <tr>
              <td>Lý do</td>
              <td>{reason.value}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const steps = [
  {
    id: "0",
    message: "Xin chào!",

    // This calls the next id
    // i.e. id 1 in this case
    trigger: "1",
  },
  {
    id: "1",

    // Here we want the user
    // to enter input
    user: true,
    trigger: "2",
  },
  {
    id: "2",
    message: " Chúng tôi có thể giúp gì cho bạn?",

    trigger: "3",
  },
  {
    id: "3",
    user: true,
    trigger: "4",
  },
  {
    id: "4",

    // This message appears in
    // the bot chat bubble
    message: "Vui lòng cho chúng tôi biết họ và tên",
    trigger: "name",
  },
  {
    id: "name",
    user: true,
    trigger: "5",
  },
  {
    id: "5",
    message: "Xin chào {previousValue}! Vui lòng chọn giới tính?",
    trigger: "gender",
  },
  {
    id: "gender",
    options: [
      { value: "Nam", label: "Nam", trigger: "6" },
      { value: "Nữ", label: "Nữ", trigger: "6" },
    ],
  },
  {
    id: "6",
    message: "Bạn bao nhiêu tuổi?",
    trigger: "age",
  },
  {
    id: "age",
    user: true,
    trigger: "7",
    validator: (value) => {
      if (isNaN(value)) {
        return "value must be a number";
      } else if (value < 0) {
        return "value must be positive";
      } else if (value > 120) {
        return `${value}? Come on!`;
      }

      return true;
    },
  },
  {
    id: "7",
    message: "Tuyệt! Kiểm tra tóm tắt của bạn",
    trigger: "review",
  },
  {
    id: "review",
    component: <Review />,
    asMessage: true,
    trigger: "update",
  },
  {
    id: "update",
    message: "Bạn có muốn cập nhật một số thông tin?",
    trigger: "update-question",
  },
  {
    id: "update-question",
    options: [
      { value: "yes", label: "Có", trigger: "update-yes" },
      { value: "no", label: "Không", trigger: "end-message" },
    ],
  },
  {
    id: "update-yes",
    message: "Bạn muốn cập nhật thông tin nào?",
    trigger: "update-fields",
  },
  {
    id: "update-fields",
    options: [
      { value: "name", label: "Tên", trigger: "update-name" },
      { value: "gender", label: "Giới tính", trigger: "update-gender" },
      { value: "age", label: "Tuổi", trigger: "update-age" },
      // { value: "reason", label: "Lý do", trigger: "update-reason" },
    ],
  },
  {
    id: "update-name",
    update: "name",
    trigger: "7",
  },
  {
    id: "update-gender",
    update: "gender",
    trigger: "7",
  },
  {
    id: "update-age",
    update: "age",
    trigger: "7",
  },
  // {
  //   id: "update-reason",
  //   update: "reason",
  //   trigger: "7",
  // },

  {
    id: "end-message",
    message: "Cảm ơn! Dữ liệu của bạn đã được gửi thành công!",
    end: true,
  },
];

// Creating our own theme
const theme = {
  background: "#CC99FF",
  headerBgColor: "#9900CC",
  headerFontSize: "20px",
  botBubbleColor: "#9966FF",
  headerFontColor: "white",
  botFontColor: "#000000",
  userBubbleColor: "#FFFF99",
  userFontColor: "#000000",
};

// Set some properties of the bot
const config = {
  floating: true,
};

function Chatbot() {
  return (
    <div className="Chatbot">
      <ThemeProvider theme={theme}>
        <ChatBot
          // This appears as the header
          // text for the chat bot
          headerTitle="Chatbot"
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </div>
  );
}

export default Chatbot;
