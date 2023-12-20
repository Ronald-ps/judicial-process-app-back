import random
import string


def generate_fake_numbers(tamanho):
    nums = []
    for _ in range(tamanho):
        num = random.randint(1, 100)
        nums.append(num)
    return "".join(map(str, nums))


def generate_fake_strings(tamanho):
    fake_strings = []
    caracteres = string.ascii_lowercase  # Isso contém todas as letras minúsculas de 'a' a 'z'

    for _ in range(tamanho):
        nova_string = "".join(random.choice(caracteres))
        fake_strings.append(nova_string)

    return "".join(fake_strings)


def generate_random_number(start=0, end=10):
    return random.randint(start, end)


def generate_fake_text(words: int = 20):
    text = []
    for _ in range(words):
        text.append(generate_fake_strings(random.randint(1, 10)))
    return " ".join(text)
