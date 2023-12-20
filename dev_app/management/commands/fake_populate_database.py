from django.core.management.base import BaseCommand
from faker import Faker

from model_bakery.baker import make

from core.models import Client
from dev_app.utils import generate_fake_date, generate_fake_numbers, generate_random_number

fake = Faker(["pt_BR"])


class Command(BaseCommand):
    help = "Descrição do comando"

    def handle(self, *args, **options):
        self.stdout.write("Populando banco de dados...")

        clients = []
        for _ in range(20):
            client = make(
                Client,
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                cpf=generate_fake_numbers(11),
                rg=generate_fake_numbers(8),
                birth_date=generate_fake_date(),
                phone=generate_fake_numbers(11),
                cellphone=generate_fake_numbers(11),
                email=fake.email(),
                father_name=fake.name(),
                mother_name=fake.name(),
                childrens_quantity=generate_random_number(end=5),
                education_level=Client.EducationLevelChoices.FUNDAMENTAL.value,
                marital_status=Client.MaritalStatusChoices.CASADO.value,
                address=fake.address(),
                city=fake.city(),
            )
            clients.append(client)
