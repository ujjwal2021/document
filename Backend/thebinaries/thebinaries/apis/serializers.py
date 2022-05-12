from rest_framework import serializers

from thebinaries.models import (
    Service,
    Project,
    Member,
    Blog,
    SocialMedia,
    ContactMessage,
    OtherInformation
)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ['id',]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        exclude = ['id',]


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ['platform','link_name','link','type']


class MemberSerializer(serializers.ModelSerializer):
    social_medias = serializers.SerializerMethodField()

    class Meta:
        model = Member
        exclude = ['id']
    
    def get_social_medias(self,obj):
        queryset = obj.links.all()
        serializer = SocialMediaSerializer(queryset,many=True)

        return serializer.data


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        exclude = ['id']


class InformationSerializer(serializers.ModelSerializer):
    social_medias = serializers.SerializerMethodField()

    class Meta:
        model = OtherInformation
        exclude = ['id']

    def get_social_medias(self,obj):
        queryset = obj.medias.all()
        serializer = SocialMediaSerializer(queryset,many=True)

        return serializer.data


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        exclude = ['id',]

        extra_kwargs = {
            'name':{'write_only':True},
            'email':{'write_only':True},
            'message':{'write_only':True}
        }
    
    def validate_name(self, name):
        if(len(name) < 3):
            raise serializers.ValidationError('Too short')
        
        return name