import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import api from "../../service/api";
import ParticleBackground from "../../components/ParticleBackground";
import logo from "../../assets/logo.png";
import { useCardTilt } from "../../hooks/useCardTilt";
import styles from "./Login.module.css";

type ButtonState = "idle" | "loading" | "success" | "error";

function Login() {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  const getButtonContent = () =>
    buttonState === "loading" ? (
      <LoadingOutlined spin />
    ) : buttonState === "success" ? (
      <CheckOutlined />
    ) : buttonState === "error" ? (
      <CloseOutlined />
    ) : (
      "Entrar"
    );

  const getButtonType = () => (buttonState === "error" ? "danger" : "primary");

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onFinish = async (values: { email: string; password: string }) => {
    setButtonState("loading");

    try {
      const [response] = await Promise.all([
        api.post("/auth/login", values),
        delay(1500),
      ]);

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setButtonState("success");
      message.success("Login realizado com sucesso!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      setButtonState("error");
      message.error(error.response?.data?.message || "Erro ao fazer login");

      setTimeout(() => {
        setButtonState("idle");
      }, 2000);
    }
  };

  const cardRef = useCardTilt(5);

  return (
    <div className={styles.container}>
      <Card
        ref={cardRef}
        title={
          <div className={styles.cardTitle}>
            <img src={logo} alt="CryptoHub" className={styles.logo} />
            CryptoHub
          </div>
        }
        className={`${styles.loginCard} fade-in-up hover-lift`}
      >
        <ParticleBackground />
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira seu email!" },
              { type: "email", message: "Email inválido!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="seu@email.com" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: "Por favor, insira sua senha!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button
              type={getButtonType()}
              htmlType="submit"
              block
              disabled={buttonState === "loading"}
              className={`morph-button ${buttonState !== "idle" ? buttonState : ""}`}
            >
              {getButtonContent()}
            </Button>
          </Form.Item>

          <div className={styles.registerLink}>
            Não tem conta? <Link to="/register">Cadastre-se</Link>
          </div>
        </Form>
      </Card>

      <p className={styles.callToAction}>
        Acompanhe suas cryptos em um só lugar!
      </p>
    </div>
  );
}

export default Login;
