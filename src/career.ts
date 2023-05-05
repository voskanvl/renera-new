import { z } from "zod";
import IMask from "imask";

export default function career() {
    const career = document.querySelector<HTMLElement>(".main > .career");
    if (!career) return;

    const modalTrigger = career.querySelector<HTMLButtonElement>("button.create__button");
    const modalForm = career.querySelector<HTMLElement>(".modal-form");
    const form = career.querySelector<HTMLFormElement>(".modal-form form");
    const close = career.querySelector<HTMLElement>(".modal-form__close");
    const agreeCheck = career.querySelector<HTMLInputElement>(
        "input[type='checkbox'][name='agree']",
    );
    const phoneInput = document.querySelector<HTMLInputElement>("input[name='tel']");

    phoneInput &&
        IMask(phoneInput, {
            mask: "+{7}(000)000-00-00",
            lazy: false,
        });

    const submitButton = career.querySelector<HTMLInputElement>("input[type='submit']");

    modalTrigger &&
        modalTrigger.addEventListener("click", () => {
            if (!modalForm) return;
            modalForm.setAttribute("open", "open");
        });
    close &&
        close.addEventListener("click", () => {
            if (!modalForm) return;
            modalForm.removeAttribute("open");
        });

    agreeCheck &&
        agreeCheck.addEventListener("change", () => {
            if (!submitButton) return;
            submitButton.disabled = !agreeCheck.checked;
        });

    submitButton &&
        submitButton.addEventListener("click", (event: Event) => {
            console.log("click");
            event.preventDefault();
            event.stopPropagation();

            const schema = z.object({
                name: z.string().min(2),
                email: z.string().email(),
                check: z.literal(true),
            });

            const nameInput = document.querySelector<HTMLInputElement>("input[name='name']");
            const nameError = document.querySelector<HTMLSpanElement>("input[name='name'] + span");
            const emailInput = document.querySelector<HTMLInputElement>("input[name='email']");
            const emailError = document.querySelector<HTMLSpanElement>(
                "input[name='email'] + span",
            );
            const checkInput = document.querySelector<HTMLInputElement>("input[name='agree']");
            const checkError = document.querySelector<HTMLSpanElement>(
                "input[name='agree'] + span",
            );

            const parseResult =
                nameInput &&
                emailInput &&
                checkInput &&
                schema.safeParse({
                    name: nameInput.value,
                    email: emailInput.value,
                    check: checkInput.checked,
                });

            if (parseResult && !parseResult?.success) {
                const errors = parseResult.error.errors;
                errors.forEach(({ path: [name] }) => {
                    if (name === "name") nameError && (nameError.style.opacity = "1");
                    if (name === "email") emailError && (emailError.style.opacity = "1");
                    if (name === "check") checkError && (checkError.style.opacity = "1");
                });
            }

            form && console.log([...new FormData(form).entries()]);

            if (parseResult?.success) {
                nameError && (nameError.style.opacity = "0");
                emailError && (emailError.style.opacity = "0");
                const container = document.querySelector<HTMLElement>(".modal-form__container");

                form &&
                    fetch("/mail1.php", {
                        method: "post",
                        body: new FormData(form),
                    }).then(r => {
                        if (r.ok) {
                            container && (container.innerText = "ЗАЯВКА ОТПРАВЛЕНА");
                            setTimeout(() => modalForm && modalForm.removeAttribute("open"), 3000);
                        } else {
                            container &&
                                (container.innerHTML = `
                                <div style="color: #f70; margin-bottom: 2em;">ВОЗНИКЛА ПРОБЛЕМА ПРИ ОТПРАВКИ ЗАЯВКИ</div>
                                <div>ПОПРОБУЙТЕ ОТПРАВИТЬ ЗАЯВКУ ЧУТЬ ПОЗЖЕ</div>
                            `);
                            setTimeout(() => {
                                modalForm && modalForm.removeAttribute("open");
                                location.reload();
                            }, 3000);
                        }
                    });
            }
        });
}
