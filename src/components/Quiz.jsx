import React, { useEffect, useState } from "react";
import styled from "styled-components";
import plus from "../assets/12/plus.svg";
import minus from "../assets/12/minus.svg";
import client from "../lib/client";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  gap: 48px;
  width: 1176px;
  height: 900px;
  background: rgba(193, 87, 87, 0.1);
  border: 3px solid rgba(150, 79, 76, 0.8);
  border-radius: 16px;
`;

const QuizList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 48px;
  width: 1080px;
  height: 924px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const QuizItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 32px;
  gap: 870px;
  width: 1080px;
  height: 60px;
  background: rgba(150, 79, 76, 0.8);
  border: 2px solid #000000;
  border-radius: 10px;
  cursor: pointer;
`;

const DateLabel = styled.div`
  display: flex;
  align-items: center;
  width: 1000px;
  height: 20px;
  font-size: 28px;
  color: #ffffff;
`;

const PlusIcon = styled.img`
  width: 22px;
  height: 22px;
  position: relative;
`;

const MinusIcon = styled(PlusIcon)``;

const QuizDetails = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.expanded ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 1080px;
  height: 300px;
  background: rgba(255, 255, 255, 0.7);
  border: 2px solid #000000;
  border-radius: 10px;
`;

const QuestionContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  gap: 87px;
  width: 980px;
  height: 76px;
  background: rgba(150, 79, 76, 0.8);
  border: 2px solid #000000;
  border-radius: 16px 16px 0px 0px;
`;

const QuestionText = styled.div`
  width: 932px;
  height: 28px;
  font-size: 28px;
  color: #ffffff;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 980px;
  border: 2px solid #000000;
  border-radius: 0px 0px 16px 16px;
`;

const CorrectAnswer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 73px;
  width: 200px;
  height: 52px;
  background: #d8c8bd;
  border: 1px solid #000000;
`;

const CorrectAnswerText = styled.div`
  font-size: 24px;
  color: #000000;
`;

const AnswerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 980px;
  height: 52px;
`;

const AnswerOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const AnswerOption = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${(props) => 780 / props.memberCount}px;
  height: 52px;
  padding: 13px 8px;
  background: ${(props) => (props.selected ? "#A86D69" : "#D8C8BD")};
  border: 1px solid #000000;
  cursor: pointer;
  color: ${(props) => (props.selected ? "#FFFFFF" : "#000000")};
`;

const Explanation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 980px;
  height: 50px;
`;

const ExplanationText = styled.div`
  font-size: 18px;
  color: #000000;
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}`;
};

const QuizComponent = ({ memberTargetSeq, inpDate }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await client.get(
          `/api/question/someone/${memberTargetSeq}/questionList/${inpDate}`,
          {
            data: {
              codeCategorySeq: 22,
              groupMemberCnt: 4,
              groupName: "가족",
            },
          }
        );
        setQuizzes(response.data.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [memberTargetSeq, inpDate]);

  useEffect(() => {
    if (expandedIndex !== null && quizzes[expandedIndex]) {
      setSelectedMember(quizzes[expandedIndex].answerForm[0].memberAnswerSeq);
    }
  }, [expandedIndex, quizzes]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setSelectedMember(null);
  };

  const toggleAnswer = (memberAnswerSeq) => {
    setSelectedMember(
      selectedMember === memberAnswerSeq ? null : memberAnswerSeq
    );
  };

  return (
    <Container>
      <QuizList>
        {quizzes.map((quiz, index) => (
          <div key={index}>
            <QuizItem
              expanded={expandedIndex === index}
              onClick={() => toggleExpand(index)}
            >
              <DateLabel>{formatDate(quiz.questionForm.inpDate)}</DateLabel>
              {expandedIndex === index ? (
                <MinusIcon src={minus} />
              ) : (
                <PlusIcon src={plus} />
              )}
            </QuizItem>
            <QuizDetails expanded={expandedIndex === index}>
              <QuestionContainer>
                <QuestionText>{quiz.questionForm.question}</QuestionText>
              </QuestionContainer>
              <AnswerContainer>
                <AnswerRow>
                  <CorrectAnswer>
                    <CorrectAnswerText>정 답</CorrectAnswerText>
                  </CorrectAnswer>
                  <CorrectAnswerText>
                    {quiz.answerForm.find((answer) => answer.answerTmpYn === 0)
                      ?.answerContents || "정답 없음"}
                  </CorrectAnswerText>
                </AnswerRow>
                <AnswerRow>
                  <CorrectAnswer>
                    <CorrectAnswerText>답 변</CorrectAnswerText>
                  </CorrectAnswer>
                  <AnswerOptionsContainer>
                    {quiz.answerForm.map((answer, idx) => (
                      <AnswerOption
                        key={idx}
                        memberCount={quiz.answerForm.length}
                        selected={selectedMember === answer.memberAnswerSeq}
                        onClick={() => toggleAnswer(answer.memberAnswerSeq)}
                      >
                        <CorrectAnswerText>
                          {answer.memberAnswerName}
                        </CorrectAnswerText>
                      </AnswerOption>
                    ))}
                  </AnswerOptionsContainer>
                </AnswerRow>
                {quiz.answerForm.map(
                  (answer, idx) =>
                    selectedMember === answer.memberAnswerSeq && (
                      <Explanation key={idx}>
                        <ExplanationText>
                          {answer.answerContents || "답변 없음"}
                        </ExplanationText>
                      </Explanation>
                    )
                )}
              </AnswerContainer>
            </QuizDetails>
          </div>
        ))}
      </QuizList>
    </Container>
  );
};

export default QuizComponent;