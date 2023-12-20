from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Descrição do comando'

    def handle(self, *args, **options):
        self.stdout.write('Este é o meu comando personalizado!')
