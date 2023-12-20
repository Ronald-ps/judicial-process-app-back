from datetime import datetime, timedelta
import random
import string


def generate_fake_numbers(tamanho: int):
    nums = []
    for _ in range(tamanho):
        num = random.randint(0, 9)
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


def generate_fake_date(start_date=datetime(1920, 1, 1), end_date=datetime.now()):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_number_of_days)

    return random_date
