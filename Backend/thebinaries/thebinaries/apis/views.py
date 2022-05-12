from rest_framework.decorators import api_view
from rest_framework.response  import Response
from rest_framework import pagination

from thebinaries.models import (
    Blog,
    ContactMessage,
    Member,
    OtherInformation,
    Project,
    Service
)

from thebinaries.apis.serializers import (
    BlogSerializer,
    ContactMessageSerializer,
    InformationSerializer,
    MemberSerializer,
    ProjectSerializer, 
    ServiceSerializer
)

PAGINATOR = pagination.PageNumberPagination()
PAGINATOR.page_size = 6


@api_view(['GET'])
def services(request):
    queryset = Service.objects.all()
    paginated_queryset = PAGINATOR.paginate_queryset(queryset,request)

    serializer = ServiceSerializer(paginated_queryset,many=True)
    
    return PAGINATOR.get_paginated_response(serializer.data)


@api_view(['GET'])
def projects(request):
    queryset = Project.objects.all()
    paginated_queryset = PAGINATOR.paginate_queryset(queryset,request)

    serializer = ProjectSerializer(paginated_queryset,many=True)
    
    return PAGINATOR.get_paginated_response(serializer.data)


@api_view(['GET'])
def members(request):
    queryset = Member.objects.all()
    paginated_queryset = PAGINATOR.paginate_queryset(queryset,request)

    serializer = MemberSerializer(paginated_queryset,many=True)
    
    return PAGINATOR.get_paginated_response(serializer.data)


@api_view(['GET'])
def blogs(request):
    queryset = Blog.objects.all()
    paginated_queryset = PAGINATOR.paginate_queryset(queryset,request)

    serializer = BlogSerializer(paginated_queryset,many=True)
    
    return PAGINATOR.get_paginated_response(serializer.data)


@api_view(['GET'])
def information(request):
    query = OtherInformation.objects.all().first()
    serializer = InformationSerializer(query)

    return Response(serializer.data)


@api_view(['POST'])
def contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)

    if serializer.is_valid():
        contact_message = ContactMessage(**serializer.validated_data)
        contact_message.save()

        return Response({'detail':'Message sent successfully .'})
    
    return Response(serializer.errors)