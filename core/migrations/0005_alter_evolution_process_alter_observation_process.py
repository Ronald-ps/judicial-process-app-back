# Generated by Django 4.2.6 on 2023-12-20 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0004_process_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="evolution",
            name="process",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="evolutions", to="core.process"
            ),
        ),
        migrations.AlterField(
            model_name="observation",
            name="process",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="observations", to="core.process"
            ),
        ),
    ]
