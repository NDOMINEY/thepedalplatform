# Generated by Django 3.2.21 on 2023-09-23 16:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pedals', '0003_alter_pedal_brand'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedal',
            name='brand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pedals', to='pedals.brands'),
        ),
        migrations.AlterField(
            model_name='pedal',
            name='category',
            field=models.CharField(choices=[('Chorus', 'Chorus'), ('Looper', 'Looper'), ('Octave', 'Octave'), ('Fuzz', 'Fuzz'), ('Overdrive and Distortion', 'Overdrive and Distortion'), ('Compressor', 'Compressor')], default='£', max_length=50),
        ),
    ]
