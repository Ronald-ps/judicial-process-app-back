import random
from django.core.management.base import BaseCommand
from faker import Faker

from model_bakery.baker import make

from core.models import Client, Honorary, Process
from dev_app.utils import generate_fake_date, generate_fake_numbers, generate_random_number

from django.contrib.auth import get_user_model
from model_bakery import baker

User = get_user_model()

fake = Faker(["pt_BR"])


class Command(BaseCommand):
    help = "Descrição do comando"

    def handle(self, *args, **options):
        self.stdout.write("Populando banco de dados...")

        self.stdout.write("Populando usuários...")

        def generate_super_user():
            if User.objects.filter(email="root@root.com").exists():
                return User.objects.get(email="root@root.com")

            user = User.objects.create_user("root@root.com", "root")
            user.is_superuser = True
            user.first_name = "Root"
            user.last_name = "Root"
            user.is_staff = True
            user.is_active = True
            user.save()
            return user

        superuser = generate_super_user()

        self.stdout.write("Populando clients...")
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
                profession=fake.job().lower(),
                address=fake.address(),
                city=fake.city(),
            )
            clients.append(client)

        self.stdout.write("Populando processos...")
        processes = []
        for client in clients:
            for _ in range(15):
                process = make(
                    Process,
                    client=client,
                    code=generate_fake_numbers(10),
                    start_date=generate_fake_date(),
                    description=fake.text(),
                )
                processes.append(process)

        self.stdout.write("Populando honorários...")
        honorary = []
        for process in processes:
            for _ in range(10):
                honorary.append(
                    make(
                        Honorary,
                        date=generate_fake_date(),
                        process=process,
                        description=fake.text(),
                        value=round(random.uniform(0, 100), 2),
                        paid_value=round(random.uniform(0, 100), 2),
                        created_by_id=superuser.id,
                    )
                )
