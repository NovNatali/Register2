import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./App.module.css";

const sendFormData = (formData) => {
  console.log(formData);
};

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_\.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/,
      "Неверный email."
    ),
  password: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/,
      "Неверный пароль."
    ),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

export const App = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirmedPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const confirmedPasswordError = errors.confirmedPassword?.message;

  const isDisabled = () => {
    return emailError || passwordError || confirmedPasswordError;
  };

  return (
    <div>
      <form className={style.main} onSubmit={handleSubmit(sendFormData)}>
        {emailError && <div className={style.errors}>{emailError}</div>}
        {passwordError && <div className={style.errors}>{passwordError}</div>}
        {confirmedPasswordError && (
          <div className={style.errors}>{confirmedPasswordError}</div>
        )}
        <label>e-mail:</label>
        <input
          name="email"
          type="text"
          placeholder="Почта"
          {...register("email")}
        />

        <label>Пароль:</label>
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          {...register("password")}
          autoComplete="off"
        />

        <label>Подтвердите пароль:</label>
        <input
          name="confirmedPassword"
          type="password"
          placeholder="Подтвердите пароль"
          {...register("confirmedPassword")}
          autoComplete="off"
        />

        <button type="submit" disabled={!!isDisabled()}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default App;
